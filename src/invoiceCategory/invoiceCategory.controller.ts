import { Controller } from '@nestjs/common';
import { InvoiceCategoryService } from './invoiceCategory.service';
import { ControllerInterface } from 'src/utils/interfaces';
import { InvoiceCategoryDto, UpdateInvoiceCategory } from './dto';
import { inventory_category } from '@prisma/client';

@Controller('invoice-category')
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

  create(dto: InvoiceCategoryDto) {
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

  update(id: number, dto: UpdateInvoiceCategory) {
    throw new Error('Method not implemented.');
  }

  delete(id: number) {
    throw new Error('Method not implemented.');
  }
}
