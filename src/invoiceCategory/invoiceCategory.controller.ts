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
  UseInterceptors,
  Param,
} from '@nestjs/common';
import { InvoiceCategoryService } from './invoiceCategory.service';
import { ControllerInterface } from '../utils/interfaces';
import { InvoiceCategoryDto, UpdateInvoiceCategory } from './dto';
import { ParseStringPipe } from '../utils/customPipes';
import { inventory_category } from '@prisma/client';
import { FindSearchInterceptor } from '../utils/interceptors';

@Controller('category/invoice')
export class InvoiceCategoryController
  implements
    ControllerInterface<
      InvoiceCategoryDto,
      UpdateInvoiceCategory,
      inventory_category
    >
{
  constructor(
    private readonly invoiceCategoryService: InvoiceCategoryService,
  ) {}

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: InvoiceCategoryDto) {
    return await this.invoiceCategoryService.create(dto);
  }

  @Get('findOne/:id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const invoiceCategory = await this.invoiceCategoryService.findOne(id);

    if (!invoiceCategory) {
      throw new NotFoundException(`Invoice #${id} category not found`);
    }
  }

  @UseInterceptors(FindSearchInterceptor)
  @Get('findSearch/:search')
  @HttpCode(HttpStatus.OK)
  async findSearch(@Param('search', ParseStringPipe) search: string) {
    return await this.invoiceCategoryService.findSearch(search);
  }

  @Get('findAll')
  @HttpCode(HttpStatus.OK)
  async findAll() {
    return await this.invoiceCategoryService.findAll();
  }

  @Get('getPage')
  @HttpCode(HttpStatus.OK)
  async getPage(
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
  ) {
    return await this.invoiceCategoryService.getPage(page, limit);
  }

  @Patch('update')
  @HttpCode(HttpStatus.OK)
  async update(
    @Query('id', ParseIntPipe) id: number,
    @Body() dto: UpdateInvoiceCategory,
  ) {
    return await this.invoiceCategoryService.update(id, dto);
  }

  delete(id: number) {
    throw new Error('Method not implemented.');
  }
}
