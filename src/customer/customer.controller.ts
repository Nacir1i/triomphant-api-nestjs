import { Controller, Post, NotFoundException, Body } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerDto } from './dto';

@Controller('document/customer')
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  @Post('getCustomer')
  async test(@Body() dto: CustomerDto) {
    const customer = await this.customerService.getCustomer(dto);

    if (!customer) {
      throw new NotFoundException();
    }
    return customer;
  }
}
