import { Injectable } from '@nestjs/common';
import { ServiceInterface } from '../utils/interfaces';
import { InvoiceCategoryDto, UpdateInvoiceCategory } from './dto';
import { invoice_category } from '@prisma/client';

@Injectable()
export class InvoiceCategoryService
  implements
    ServiceInterface<
      InvoiceCategoryDto,
      UpdateInvoiceCategory,
      invoice_category
    >
{
  create(dto: InvoiceCategoryDto): Promise<invoice_category> {
    throw new Error('Method not implemented.');
  }

  findOne(id: number): Promise<invoice_category> {
    throw new Error('Method not implemented.');
  }

  findSearch(search: string): Promise<[] | invoice_category[]> {
    throw new Error('Method not implemented.');
  }

  findAll(): Promise<[] | invoice_category[]> {
    throw new Error('Method not implemented.');
  }

  getPage(page: number, limit: number): object {
    throw new Error('Method not implemented.');
  }

  update(id: number, dto: UpdateInvoiceCategory): Promise<invoice_category> {
    throw new Error('Method not implemented.');
  }

  delete(id: number): Promise<invoice_category> {
    throw new Error('Method not implemented.');
  }
}
