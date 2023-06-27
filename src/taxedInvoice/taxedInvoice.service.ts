import { Injectable } from '@nestjs/common';
import { ServiceInterface } from '../utils/interfaces';
import { TaxedInvoiceDto, UpdateTaxedInvoiceDto } from './dto';
import { taxed_invoice } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { constructUpdateMany } from '../utils/common';

@Injectable()
export class TaxedInvoiceService
  implements
    ServiceInterface<TaxedInvoiceDto, UpdateTaxedInvoiceDto, taxed_invoice>
{
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: TaxedInvoiceDto): Promise<taxed_invoice> {
    return await this.prismaService.taxed_invoice.create({
      data: {
        ref: dto.ref,
        title: dto.title,
        paid: dto.paid,
        price: dto.price,
        note: dto.note,
        delivery_address: dto.delivery_address,
        due_date: dto.due_date,
        status: dto.status,

        category: {
          connect: {
            id: dto.category_id,
          },
        },
        customer: {
          connect: {
            id: dto.customer_id,
          },
        },
        order: {
          connect: {
            id: dto.order_id,
          },
        },
        quote: {
          connect: {
            id: dto.quote_id,
          },
        },
        delivery_invoice: {
          connect: {
            id: dto.delivery_invoice_id,
          },
        },

        cost_modifier: {
          create: {
            shipping: dto.cost_modifier.shipping,
            discount: dto.cost_modifier.discount,
            is_discount_percentage: dto.cost_modifier.is_discount_percentage,
            tax: dto.cost_modifier.tax,
          },
        },
        products: {
          create: dto.products,
        },
        services: {
          create: dto.services,
        },
        packages: {
          create: dto.packages,
        },
        manual_content: {
          create: dto.manualContent,
        },
      },
    });
  }

  async findOne(id: number): Promise<taxed_invoice> {
    return await this.prismaService.taxed_invoice.findFirst({
      where: {
        AND: [
          {
            id: id,
          },
          {
            is_deleted: false,
          },
        ],
      },
      include: {
        order: true,
        customer: true,
        quote: true,
        delivery_invoice: true,
      },
    });
  }

  async findSearch(search: string): Promise<[] | taxed_invoice[]> {
    return await this.prismaService.taxed_invoice.findMany({
      where: {
        AND: {
          is_deleted: false,
        },
        OR: [
          {
            ref: search,
          },
          {
            title: search,
          },
        ],
      },
      include: {
        order: true,
        customer: true,
        quote: true,
        delivery_invoice: true,
      },
    });
  }

  async findAll(): Promise<[] | taxed_invoice[]> {
    return await this.prismaService.taxed_invoice.findMany();
  }

  async getPage(page: number, limit: number): Promise<object> {
    const startIndex = (page - 1) * limit;

    const taxedInvoiced = await this.prismaService.taxed_invoice.findMany({
      skip: startIndex,
      take: limit,
      where: {
        is_deleted: false,
      },
      include: {
        order: true,
        customer: true,
        quote: true,
        delivery_invoice: true,
      },
    });

    const findAll = (await this.findAll()).length;

    const pagesCount = findAll <= limit ? 1 : Math.ceil(findAll / limit);
    const remainingPages = pagesCount - page >= 0 ? pagesCount - page : 0;

    return { taxedInvoiced, pagesCount, remainingPages };
  }

  async update(id: number, dto: UpdateTaxedInvoiceDto): Promise<taxed_invoice> {
    const updateManyProductQuery = constructUpdateMany(
      dto.updateProducts.update,
      'product_id',
    );
    const updateManyServiceQuery = constructUpdateMany(
      dto.updateServices.update,
      'service_id',
    );
    const updateManyPackageQuery = constructUpdateMany(
      dto.updateServices.update,
      'package_id',
    );
    const updateManyManualQuery = constructUpdateMany(
      dto.updateManualContent.update,
      'id',
    );

    return await this.prismaService.taxed_invoice.update({
      where: {
        id: id,
      },
      data: {
        ref: dto.ref,
        title: dto.title,
        paid: dto.paid,
        price: dto.price,
        note: dto.note,
        delivery_address: dto.delivery_address,
        due_date: dto.due_date,
        status: dto.status,

        category: {
          connect: {
            id: dto.category_id,
          },
        },
        customer: {
          connect: {
            id: dto.customer_id,
          },
        },
        quote: {
          connect: {
            id: dto.quote_id,
          },
        },

        cost_modifier: {
          update: {
            shipping: dto.cost_modifier.shipping,
            discount: dto.cost_modifier.discount,
            is_discount_percentage: dto.cost_modifier.is_discount_percentage,
            tax: dto.cost_modifier.tax,
          },
        },

        products: {
          create: dto.updateProducts.add,
          updateMany: updateManyProductQuery,
          deleteMany: dto.updateProducts.delete,
        },
        services: {
          create: dto.updateServices.add,
          updateMany: updateManyServiceQuery,
          deleteMany: dto.updateServices.delete,
        },
        packages: {
          create: dto.updatePackage.add,
          updateMany: updateManyPackageQuery,
          deleteMany: dto.updatePackage.delete,
        },
        manual_content: {
          create: dto.updateManualContent.add,
          updateMany: updateManyManualQuery,
          deleteMany: dto.updateManualContent.delete,
        },
      },
    });
  }

  async delete(id: number): Promise<taxed_invoice> {
    return await this.prismaService.taxed_invoice.update({
      where: {
        id: id,
      },
      data: {
        is_deleted: true,
      },
    });
  }
}
