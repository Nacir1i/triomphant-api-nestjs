import {
  Controller,
  Post,
  Get,
  Patch,
  Body,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
  Query,
  Delete,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import { ParseStringPipe } from '../utils/customPipes';
import { DeliveryInvoiceService } from './deliveryInvoice.service';
import { DeliveryInvoiceDto, UpdateDeliveryInvoiceDto } from './dto';
import { delivery_invoice } from '@prisma/client';
import { ControllerInterface } from '../utils/interfaces';
import { FindManyInterceptor } from '../utils/interceptors';

@Controller('delivery-invoice')
export class DeliveryInvoiceController
  implements
    ControllerInterface<
      DeliveryInvoiceDto,
      UpdateDeliveryInvoiceDto,
      delivery_invoice
    >
{
  constructor(
    private readonly deliveryInvoiceService: DeliveryInvoiceService,
  ) {}

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: DeliveryInvoiceDto) {
    return this.deliveryInvoiceService.create(dto);
  }

  @Get('findOne/:id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.deliveryInvoiceService.findOne(id);
  }

  @UseInterceptors(FindManyInterceptor)
  @Get('findSearch/:search')
  @HttpCode(HttpStatus.OK)
  async findSearch(@Param('search', ParseStringPipe) search: string) {
    return this.deliveryInvoiceService.findSearch(search);
  }

  @Get('findAll')
  @HttpCode(HttpStatus.OK)
  async findAll() {
    return this.deliveryInvoiceService.findAll();
  }

  @Get('getPage')
  @HttpCode(HttpStatus.OK)
  async getPage(
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
  ) {
    return this.deliveryInvoiceService.getPage(page, limit);
  }

  @Patch('update')
  @HttpCode(HttpStatus.OK)
  async update(
    @Query('id', ParseIntPipe) id: number,
    @Body() dto: UpdateDeliveryInvoiceDto,
  ) {
    return this.deliveryInvoiceService.update(id, dto);
  }

  @Delete('delete/:id')
  @HttpCode(HttpStatus.OK)
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.deliveryInvoiceService.delete(id);
  }
}
