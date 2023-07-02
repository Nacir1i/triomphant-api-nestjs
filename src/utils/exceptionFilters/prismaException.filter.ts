import { Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { Response, Request } from 'express';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter extends BaseExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const { meta } = exception;

    let status = 500;
    let messageError = 'Unexpected error occurred while processing request';

    switch (exception.code) {
      case 'P2000': {
        status = HttpStatus.BAD_REQUEST;
        messageError = 'Invalid request data.';
        break;
      }
      case 'P2002': {
        status = HttpStatus.CONFLICT;
        messageError = `Duplicate entry error : ${meta?.target}`;
        break;
      }
      case 'P2025': {
        status = HttpStatus.NOT_FOUND;
        messageError = this.extractErrorMessage(`${meta?.cause}`);
        break;
      }
      default:
        super.catch(exception, host);
        break;
    }

    response.status(status).json({
      message: messageError,
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      success: false,
    });
  }

  private extractErrorMessage(message: string): string {
    const regex =
      /No '(\w+)' record\(s\) \(needed to inline the relation on '(\w+)' record\(s\)\) was found/g;
    const matches = regex.exec(message);

    if (matches && matches.length === 3) {
      const relatedEntity = matches[1];
      const mainEntity = matches[2];
      return `The provided '${relatedEntity}' was not found for '${mainEntity}'.`;
    }

    return message;
  }
}
