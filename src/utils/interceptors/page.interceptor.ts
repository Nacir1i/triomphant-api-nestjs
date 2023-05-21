import { Injectable } from '@nestjs/common';
import BaseInterceptor from './baseInterceptor';

@Injectable()
export class PageInterceptor<T> extends BaseInterceptor<T> {
  constructor() {
    super('Page was fetched successfully');
  }
}
