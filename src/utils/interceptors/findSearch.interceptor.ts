import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { Response } from '../interfaces';

@Injectable()
export class FindSearchInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
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
