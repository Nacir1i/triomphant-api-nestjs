import { Injectable } from '@nestjs/common';
import { ServiceInterface } from 'src/utils/interfaces';
import { QuoteDto, UpdateQuoteDto } from './dto';
import { quote } from '@prisma/client';

@Injectable()
export class QuotesService
  implements ServiceInterface<QuoteDto, UpdateQuoteDto, quote>
{
  create(dto: QuoteDto): Promise<quote> {
    throw new Error('Method not implemented.');
  }

  findOne(id: number): Promise<quote> {
    throw new Error('Method not implemented.');
  }

  findSearch(search: string): Promise<[] | quote[]> {
    throw new Error('Method not implemented.');
  }

  findAll(): Promise<[] | quote[]> {
    throw new Error('Method not implemented.');
  }

  getPage(page: number, limit: number): Promise<object> {
    throw new Error('Method not implemented.');
  }

  update(id: number, dto: UpdateQuoteDto): Promise<quote> {
    throw new Error('Method not implemented.');
  }

  delete(id: number): Promise<quote> {
    throw new Error('Method not implemented.');
  }
}
