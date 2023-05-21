import { Injectable } from '@nestjs/common';
import BaseInterceptor from './baseInterceptor';

@Injectable()
export class UpdateInterceptor<T> extends BaseInterceptor<T> {
  constructor() {
    super('Record was updated successfully');
  }
}
