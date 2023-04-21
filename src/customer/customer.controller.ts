import { Controller, Post } from '@nestjs/common';
import { CustomerService } from './customer.service';

@Controller('document/customer')
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  @Post('getCustomer')
  async test() {
    return { customer: 'lol' };
  }
}
