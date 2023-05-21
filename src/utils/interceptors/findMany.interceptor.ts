import { Injectable, NestInterceptor, CallHandler } from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { Response } from '../interfaces';

@Injectable()
export class FindManyInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(_: any, next: CallHandler): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => ({
        data,
        message: `Found ${data.length} records`,
        statusCode: 200,
        success: true,
        timeStamp: new Date().toISOString(),
      })),
    );
  }
}
