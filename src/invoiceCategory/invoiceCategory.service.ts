import { Injectable } from '@nestjs/common';
import { ServiceInterface } from '../utils/interfaces';
import { InvoiceCategoryDto, UpdateInvoiceCategory } from './dto';
import { PrismaService } from '../prisma/prisma.service';
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
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: InvoiceCategoryDto): Promise<invoice_category> {
    return await this.prismaService.invoice_category.create({
      data: {
        title: dto.title,
      },
    });
  }

  async findOne(id: number): Promise<invoice_category> {
    return await this.prismaService.invoice_category.findUnique({
      where: {
        id: id,
      },
    });
  }

  async findSearch(search: string): Promise<[] | invoice_category[]> {
    return await this.prismaService.invoice_category.findMany({
      where: {
        title: {
          contains: search,
        },
      },
    });
  }

  async findAll(): Promise<[] | invoice_category[]> {
    return await this.prismaService.invoice_category.findMany();
  }

  async getPage(page: number, limit: number): Promise<object> {
    const startIndex = (page - 1) * limit;

    const invoiceCategories =
      await this.prismaService.inventory_category.findMany({
        skip: startIndex,
        take: limit,
      });

    const findAll = (await this.findAll()).length;

    const pagesCount = findAll <= limit ? 1 : Math.ceil(findAll / limit);
    const remainingPages = pagesCount - page >= 0 ? pagesCount - page : 0;

    return { invoiceCategories, pagesCount, remainingPages };
  }

  async update(
    id: number,
    dto: UpdateInvoiceCategory,
  ): Promise<invoice_category> {
    return await this.prismaService.invoice_category.update({
      where: {
        id: id,
      },
      data: {
        title: dto.title,
      },
    });
  }

  delete(id: number): Promise<invoice_category> {
    throw new Error('Method not implemented.');
  }
}
