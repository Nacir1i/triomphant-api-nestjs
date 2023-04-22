import {
  Controller,
  Post,
  Get,
  NotFoundException,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerDto, PartialTypedCustomer } from './dto';

@Controller('agent/customer')
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CustomerDto) {
    return this.customerService.create(dto);
  }

  @Get('findAll')
  async findAll() {}

  @Post('findOne')
  @HttpCode(HttpStatus.OK)
  async findOne(@Body() dto: PartialTypedCustomer) {
    const customer = await this.customerService.findOne(dto);

    if (!customer) {
      throw new NotFoundException();
    }
    return customer;
  }
}
