import {
  Controller,
  Post,
  NotFoundException,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerDto } from './dto';
import { customer } from '@prisma/client';

@Controller('document/customer')
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  @Post('create')
  @HttpCode(HttpStatus.OK)
  async create(@Body() dto: CustomerDto) {
    return {};
  }

  @Post('getCustomer')
  @HttpCode(HttpStatus.OK)
  async getCustomer(@Body() dto: CustomerDto): Promise<customer> {
    const customer = await this.customerService.getCustomer(dto);

    if (!customer) {
      throw new NotFoundException();
    }
    return customer;
  }
}
