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
import {
  CreateInterceptor,
  DeleteInterceptor,
  FindOneInterceptor,
  FindManyInterceptor,
  UpdateInterceptor,
  PageInterceptor,
} from '../utils/interceptors';
import { ParseStringPipe } from '../utils/customPipes';
import { DeliveryInvoiceService } from './deliveryInvoice.service';
import {
  DeliveryInvoiceCommentDto,
  DeliveryInvoiceCommentNoteDto,
  DeliveryInvoiceDto,
  UpdateDeliveryInvoiceDto,
} from './dto';
import { delivery_invoice } from '@prisma/client';
import { ControllerInterface } from '../utils/interfaces';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth('JWT-auth')
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

  @UseInterceptors(CreateInterceptor)
  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: DeliveryInvoiceDto) {
    return this.deliveryInvoiceService.create(dto);
  }

  @UseInterceptors(FindOneInterceptor)
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

  @UseInterceptors(FindManyInterceptor)
  @Get('findAll')
  @HttpCode(HttpStatus.OK)
  async findAll() {
    return this.deliveryInvoiceService.findAll();
  }

  @UseInterceptors(PageInterceptor)
  @Get('getPage')
  @HttpCode(HttpStatus.OK)
  async getPage(
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
  ) {
    return this.deliveryInvoiceService.getPage(page, limit);
  }

  @UseInterceptors(UpdateInterceptor)
  @Patch('update')
  @HttpCode(HttpStatus.OK)
  async update(
    @Query('id', ParseIntPipe) id: number,
    @Body() dto: UpdateDeliveryInvoiceDto,
  ) {
    return this.deliveryInvoiceService.update(id, dto);
  }

  @UseInterceptors(CreateInterceptor)
  @Post('comment/create')
  @HttpCode(HttpStatus.CREATED)
  async createComment(@Body() dto: DeliveryInvoiceCommentDto) {
    return await this.deliveryInvoiceService.createComment(dto);
  }

  @UseInterceptors(CreateInterceptor)
  @Get('comment/findAll/:id')
  @HttpCode(HttpStatus.CREATED)
  async findCustomerComments(@Param('id', ParseIntPipe) id: number) {
    return await this.deliveryInvoiceService.findCustomerComments(id);
  }

  @UseInterceptors(CreateInterceptor)
  @Post('comment/note/create')
  @HttpCode(HttpStatus.CREATED)
  async createCommentNote(@Body() dto: DeliveryInvoiceCommentNoteDto) {
    return this.deliveryInvoiceService.createCommentNote(dto);
  }

  @UseInterceptors(DeleteInterceptor)
  @Delete('delete/:id')
  @HttpCode(HttpStatus.OK)
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.deliveryInvoiceService.delete(id);
  }
}
