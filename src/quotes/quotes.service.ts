import { Injectable } from '@nestjs/common';
import { ServiceInterface } from '../utils/interfaces';
import { QuoteDto, UpdateQuoteDto } from './dto';
import { quote } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { constructUpdateMany } from '../utils/common';

@Injectable()
export class QuotesService
  implements ServiceInterface<QuoteDto, UpdateQuoteDto, quote>
{
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: QuoteDto): Promise<quote> {
    return await this.prismaService.quote.create({
      data: {
        title: dto.title,
        price: dto.price,
        note: dto.note,
        address: dto.address,
        ref: dto.ref,
        due_date: dto.due_date,
        status: dto.status,

        customer: {
          connect: {
            id: dto.customer_id,
          },
        },
        category: {
          connect: {
            id: dto.category_id,
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

  async findOne(id: number): Promise<quote> {
    return await this.prismaService.quote.findFirst({
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
    });
  }

  async findSearch(search: string): Promise<[] | quote[]> {
    return await this.prismaService.quote.findMany({
      where: {
        OR: [
          {
            title: {
              contains: search,
            },
            ref: {
              contains: search,
            },
            address: {
              contains: search,
            },
          },
          {
            is_deleted: false,
          },
        ],
        AND: {
          is_deleted: false,
        },
      },
    });
  }

  async findAll(): Promise<[] | quote[]> {
    return await this.prismaService.quote.findMany();
  }

  async getPage(page: number, limit: number): Promise<object> {
    const startIndex = (page - 1) * limit;

    const quotes = await this.prismaService.quote.findMany({
      skip: startIndex,
      take: limit,
      where: {
        is_deleted: false,
      },
      include: {
        products: true,
        services: true,
        packages: true,
        manual_content: true,
        category: true,
      },
    });

    const findAll = (await this.findAll()).length;

    const pagesCount = findAll <= limit ? 1 : Math.ceil(findAll / limit);
    const remainingPages = pagesCount - page >= 0 ? pagesCount - page : 0;

    return { quotes, pagesCount, remainingPages };
  }

  async update(id: number, dto: UpdateQuoteDto): Promise<quote> {
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

    return await this.prismaService.quote.update({
      where: {
        id: id,
      },
      data: {
        title: dto.title,
        price: dto.price,
        note: dto.note,
        address: dto.address,
        ref: dto.ref,
        due_date: dto.due_date,
        status: dto.status,

        customer: {
          connect: {
            id: dto.customer_id,
          },
        },
        category: {
          connect: {
            id: dto.category_id,
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

  async delete(id: number): Promise<quote> {
    return await this.prismaService.quote.update({
      where: {
        id: id,
      },
      data: {
        is_deleted: true,
      },
    });
  }
}
