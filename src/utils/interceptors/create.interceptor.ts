import { Injectable } from '@nestjs/common';
import BaseInterceptor from './baseInterceptor';

@Injectable()
export class CreateInterceptor<T> extends BaseInterceptor<T> {
  constructor() {
    super('Record was created successfully');
  }
}
