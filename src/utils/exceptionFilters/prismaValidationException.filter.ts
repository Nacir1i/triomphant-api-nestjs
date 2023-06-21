import { Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { Response, Request } from 'express';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';

@Catch(Prisma.PrismaClientValidationError)
export class PrismaValidationExceptionFilter extends BaseExceptionFilter {
  catch(exception: Prisma.PrismaClientValidationError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status = HttpStatus.BAD_REQUEST;
    const messageError = this.extractErrorMessage(exception.message);

    response.status(status).json({
      message: messageError,
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      success: false,
    });
  }

  private extractErrorMessage(message: string): string {
    const regex = /Argument (\w+): Got invalid value '(.+)' on/g;
    const matches = regex.exec(message);

    if (matches && matches.length === 3) {
      const argument = matches[1];
      const invalidValue = matches[2];
      return `Invalid value '${invalidValue}' provided for '${argument}'.`;
    }

    return 'Invalid request data.';
  }
}
