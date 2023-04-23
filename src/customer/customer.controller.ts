import {
  Controller,
  Post,
  Get,
  Patch,
  NotFoundException,
  Body,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
  Query,
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

  @Post('findOne')
  @HttpCode(HttpStatus.OK)
  async findOne(@Body() dto: PartialTypedCustomer) {
    const customer = await this.customerService.findOne(dto);

    if (!customer) {
      throw new NotFoundException();
    }
    return customer;
  }

  @Get('findAll')
  @HttpCode(HttpStatus.OK)
  async findAll() {
    return await this.customerService.findAll();
  }

  @Get('getPage')
  @HttpCode(HttpStatus.OK)
  async getPage(
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
  ) {
    return this.customerService.getPage(page, limit);
  }

  @Patch('update')
  @HttpCode(HttpStatus.OK)
  async update(
    @Query('id', ParseIntPipe) id: number,
    @Body() dto: PartialTypedCustomer,
  ) {
    const updated = await this.customerService.update(id, dto);

    return updated;
  }
}
