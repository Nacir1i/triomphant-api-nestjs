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
  Delete,
  Param,
} from '@nestjs/common';
import { ParseStringPipe } from '../customPipes';
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

  @Get('findOne/:id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const customer = await this.customerService.findOne(id);

    if (!customer) {
      throw new NotFoundException();
    }

    return customer;
  }

  @Get('findSearch/:search')
  @HttpCode(HttpStatus.OK)
  async findSearch(@Param('search', ParseStringPipe) search: string) {
    const customers = await this.customerService.findSearch(search);

    return customers;
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

  @Delete('delete')
  @HttpCode(HttpStatus.OK)
  async delete(@Query('id', ParseIntPipe) id: number) {
    return await this.customerService.delete(id);
  }
}
