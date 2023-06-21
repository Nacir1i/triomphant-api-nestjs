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
import {
  CreateInterceptor,
  FindOneInterceptor,
  FindManyInterceptor,
  UpdateInterceptor,
  PageInterceptor,
} from '../utils/interceptors';
import { InvoiceCategoryService } from './invoiceCategory.service';
import { ControllerInterface } from '../utils/interfaces';
import { InvoiceCategoryDto, UpdateInvoiceCategory } from './dto';
import { ParseStringPipe } from '../utils/customPipes';
import { inventory_category } from '@prisma/client';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth('JWT-auth')
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

  @UseInterceptors(CreateInterceptor)
  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: InvoiceCategoryDto) {
    return await this.invoiceCategoryService.create(dto);
  }

  @UseInterceptors(FindOneInterceptor)
  @Get('findOne/:id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const invoiceCategory = await this.invoiceCategoryService.findOne(id);

    if (!invoiceCategory) {
      throw new NotFoundException(`Invoice #${id} category not found`);
    }

    return invoiceCategory;
  }

  @UseInterceptors(FindManyInterceptor)
  @Get('findSearch/:search')
  @HttpCode(HttpStatus.OK)
  async findSearch(@Param('search', ParseStringPipe) search: string) {
    return await this.invoiceCategoryService.findSearch(search);
  }

  @UseInterceptors(FindManyInterceptor)
  @Get('findAll')
  @HttpCode(HttpStatus.OK)
  async findAll() {
    return await this.invoiceCategoryService.findAll();
  }

  @UseInterceptors(PageInterceptor)
  @Get('getPage')
  @HttpCode(HttpStatus.OK)
  async getPage(
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
  ) {
    return await this.invoiceCategoryService.getPage(page, limit);
  }

  @UseInterceptors(UpdateInterceptor)
  @Patch('update')
  @HttpCode(HttpStatus.OK)
  async update(
    @Query('id', ParseIntPipe) id: number,
    @Body() dto: UpdateInvoiceCategory,
  ) {
    return await this.invoiceCategoryService.update(id, dto);
  }

  delete(id: number) {}
}
