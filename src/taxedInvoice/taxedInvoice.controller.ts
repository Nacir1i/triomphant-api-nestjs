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
  UseInterceptors,
} from '@nestjs/common';
import {
  CreateInterceptor,
  DeleteInterceptor,
  FindManyInterceptor,
  FindOneInterceptor,
  PageInterceptor,
  UpdateInterceptor,
} from '../utils/interceptors';
import { ParseStringPipe } from '../utils/customPipes';
import { TaxedInvoiceService } from './taxedInvoice.service';
import { ControllerInterface } from '../utils/interfaces';
import { ApiBearerAuth } from '@nestjs/swagger';
import { TaxedInvoiceDto, UpdateTaxedInvoiceDto } from './dto';
import { taxed_invoice } from '@prisma/client';

@ApiBearerAuth('JWT-auth')
@Controller('taxed-invoice')
export class TaxedInvoiceController
  implements
    ControllerInterface<TaxedInvoiceDto, UpdateTaxedInvoiceDto, taxed_invoice>
{
  constructor(private readonly taxedInvoiceService: TaxedInvoiceService) {}

  @UseInterceptors(CreateInterceptor)
  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: TaxedInvoiceDto): Promise<taxed_invoice> {
    return await this.taxedInvoiceService.create(dto);
  }

  @UseInterceptors(FindOneInterceptor)
  @Get('findOne/:id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<taxed_invoice> {
    const taxedInvoice = await this.taxedInvoiceService.findOne(id);

    if (!taxedInvoice)
      throw new NotFoundException(`Taxed invoice #${id} not found`);

    return taxedInvoice;
  }

  @UseInterceptors(FindManyInterceptor)
  @Get('findSearch/:search')
  @HttpCode(HttpStatus.OK)
  async findSearch(@Param('search', ParseStringPipe) search: string) {
    return await this.taxedInvoiceService.findSearch(search);
  }

  @UseInterceptors(FindManyInterceptor)
  @Get('findAll')
  @HttpCode(HttpStatus.OK)
  async findAll() {
    return await this.taxedInvoiceService.findAll();
  }

  @UseInterceptors(PageInterceptor)
  @Get('getPage')
  @HttpCode(HttpStatus.OK)
  async getPage(
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
  ) {
    return await this.taxedInvoiceService.getPage(page, limit);
  }

  @UseInterceptors(UpdateInterceptor)
  @Patch('update')
  @HttpCode(HttpStatus.OK)
  async update(
    @Query('id', ParseIntPipe) id: number,
    @Body() dto: UpdateTaxedInvoiceDto,
  ) {
    return await this.taxedInvoiceService.update(id, dto);
  }

  @UseInterceptors(DeleteInterceptor)
  @Delete('delete/:id')
  @HttpCode(HttpStatus.OK)
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.taxedInvoiceService.delete(id);
  }
}
