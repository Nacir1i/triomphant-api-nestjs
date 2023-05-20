import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Request, Response } from 'express';
import { Prisma } from '@prisma/client';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  constructor() {}

  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let message: string = 'Prisma error';
    let status: number = 400;

    switch (exception.code) {
      case 'P1000':
        status = 500;
        message =
          'Authentication failed against database server, Invalid credentials';
        break;
      case 'P1001':
        status = 500;
        message = "Can't reach database server";
        break;
      case 'P1017':
        status = 500;
        message = 'Server has closed the connection.';
        break;
      default:
        status = 404;
        message = `${exception.message} ${exception.meta?.cause}`;
        break;
    }

    response.status(status).send({
      message,
      success: false,
    });
  }
}
