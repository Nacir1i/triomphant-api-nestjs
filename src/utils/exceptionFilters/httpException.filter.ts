import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

interface ExceptionResponse {
  statusCode?: number;
  message?: any;
  error?: string;
}

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor() {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const exceptionResponse = exception.getResponse() as ExceptionResponse;

    response.status(status).json({
      message: exceptionResponse.message || 'Http request exception',
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      success: false,
    });
  }
}
