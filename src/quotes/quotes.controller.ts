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
import { ParseStringPipe } from '../utils/customPipes';
import { QuotesService } from './quotes.service';
import { ControllerInterface } from '../utils/interfaces';
import { QuoteDto, UpdateQuoteDto } from './dto';
import { quote } from '@prisma/client';
import { FindManyInterceptor } from '../utils/interceptors';

@Controller('quotes')
export class QuotesController
  implements ControllerInterface<QuoteDto, UpdateQuoteDto, quote>
{
  constructor(private readonly quotesService: QuotesService) {}

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: QuoteDto) {
    return await this.quotesService.create(dto);
  }

  @Get('findOne/:id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const quote = await this.quotesService.findOne(id);

    if (!quote) {
      throw new NotFoundException(`Quotes ${id} was not found`);
    }

    return quote;
  }

  @UseInterceptors(FindManyInterceptor)
  @Get('findSearch/:search')
  @HttpCode(HttpStatus.OK)
  async findSearch(@Param('search', ParseStringPipe) search: string) {
    return this.quotesService.findSearch(search);
  }

  @Get('findAll')
  @HttpCode(HttpStatus.OK)
  async findAll() {
    return this.quotesService.findAll();
  }

  @Get('getPage')
  @HttpCode(HttpStatus.OK)
  async getPage(
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
  ) {
    return await this.quotesService.getPage(page, limit);
  }

  @Patch('update')
  @HttpCode(HttpStatus.OK)
  async update(
    @Query('id', ParseIntPipe) id: number,
    @Body() dto: UpdateQuoteDto,
  ) {
    return await this.quotesService.update(id, dto);
  }

  @Delete('delete/:id')
  @HttpCode(HttpStatus.OK)
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.quotesService.delete(id);
  }
}
