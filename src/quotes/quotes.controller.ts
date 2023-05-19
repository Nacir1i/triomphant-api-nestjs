import { Controller } from '@nestjs/common';
import { QuotesService } from './quotes.service';
import { ControllerInterface } from '../utils/interfaces';
import { QuoteDto, UpdateQuoteDto } from './dto';
import { quote } from '@prisma/client';

@Controller('quotes')
export class QuotesController
  implements ControllerInterface<QuoteDto, UpdateQuoteDto, quote>
{
  constructor(private readonly quotesService: QuotesService) {}

  create(dto: QuoteDto) {
    throw new Error('Method not implemented.');
  }

  findOne(id: number) {
    throw new Error('Method not implemented.');
  }

  findSearch(search: string) {
    throw new Error('Method not implemented.');
  }

  findAll() {
    throw new Error('Method not implemented.');
  }

  getPage(page: number, limit: number) {
    throw new Error('Method not implemented.');
  }

  update(id: number, dto: UpdateQuoteDto) {
    throw new Error('Method not implemented.');
  }

  delete(id: number) {
    throw new Error('Method not implemented.');
  }
}
