import { Injectable } from '@nestjs/common';
import BaseInterceptor from './baseInterceptor';

@Injectable()
export class FindOneInterceptor<T> extends BaseInterceptor<T> {
  constructor() {
    super('Record was found successfully');
  }
}
