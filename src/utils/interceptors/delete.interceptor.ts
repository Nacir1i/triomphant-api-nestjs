import { Injectable } from '@nestjs/common';
import BaseInterceptor from './baseInterceptor';

@Injectable()
export class DeleteInterceptor<T> extends BaseInterceptor<T> {
  constructor() {
    super('Record was deleted successfully');
  }
}
