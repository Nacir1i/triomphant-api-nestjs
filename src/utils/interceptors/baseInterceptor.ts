import { NestInterceptor, CallHandler } from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { Response } from '../interfaces';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth('JWT-auth')
export default class BaseInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  constructor(private message: string) {}

  intercept(_: any, next: CallHandler): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => ({
        data,
        message: this.message,
        statusCode: 200,
        success: true,
        timeStamp: new Date().toISOString(),
      })),
    );
  }
}
