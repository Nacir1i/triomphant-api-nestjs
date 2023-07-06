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
import { QuotesService } from './quotes.service';
import { ControllerInterface } from '../utils/interfaces';
import {
  QuoteCommentDto,
  QuoteCommentNoteDto,
  QuoteDto,
  UpdateQuoteDto,
} from './dto';
import { quote } from '@prisma/client';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth('JWT-auth')
@Controller('quotes')
export class QuotesController
  implements ControllerInterface<QuoteDto, UpdateQuoteDto, quote>
{
  constructor(private readonly quotesService: QuotesService) {}

  @UseInterceptors(CreateInterceptor)
  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: QuoteDto) {
    return await this.quotesService.create(dto);
  }

  @UseInterceptors(FindOneInterceptor)
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

  @UseInterceptors(FindManyInterceptor)
  @Get('findAll')
  @HttpCode(HttpStatus.OK)
  async findAll() {
    return this.quotesService.findAll();
  }

  @UseInterceptors(PageInterceptor)
  @Get('getPage')
  @HttpCode(HttpStatus.OK)
  async getPage(
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
  ) {
    return await this.quotesService.getPage(page, limit);
  }

  @UseInterceptors(UpdateInterceptor)
  @Patch('update')
  @HttpCode(HttpStatus.OK)
  async update(
    @Query('id', ParseIntPipe) id: number,
    @Body() dto: UpdateQuoteDto,
  ) {
    return await this.quotesService.update(id, dto);
  }

  @UseInterceptors(CreateInterceptor)
  @Post('comment/create')
  @HttpCode(HttpStatus.CREATED)
  async createComment(@Body() dto: QuoteCommentDto) {
    return await this.quotesService.createComment(dto);
  }

  @UseInterceptors(CreateInterceptor)
  @Get('comment/findAll/:id')
  @HttpCode(HttpStatus.CREATED)
  async findCustomerComments(@Param('id', ParseIntPipe) id: number) {
    return await this.quotesService.findCustomerComments(id);
  }

  @UseInterceptors(CreateInterceptor)
  @Post('comment/note/create')
  @HttpCode(HttpStatus.CREATED)
  async createCommentNote(@Body() dto: QuoteCommentNoteDto) {
    return this.quotesService.createCommentNote(dto);
  }

  @UseInterceptors(DeleteInterceptor)
  @Delete('delete/:id')
  @HttpCode(HttpStatus.OK)
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.quotesService.delete(id);
  }
}
