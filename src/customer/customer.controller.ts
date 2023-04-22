import {
  Controller,
  Post,
  NotFoundException,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerDto, PartialTypedCustomer } from './dto';
import { customer } from '@prisma/client';

@Controller('document/customer')
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  @Post('create')
  @HttpCode(HttpStatus.OK)
  async create(@Body() dto: CustomerDto) {
    return {};
  }

  @Post('findOne')
  @HttpCode(HttpStatus.OK)
  async findOne(@Body() dto: PartialTypedCustomer): Promise<customer> {
    const customer = await this.customerService.getCustomer(dto);

    if (!customer) {
      throw new NotFoundException();
    }
    return customer;
  }
}
