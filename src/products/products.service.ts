import { Injectable, NotFoundException } from '@nestjs/common';
import { ServiceInterface } from 'src/utils/interfaces';
import { ProductDto, UpdateProductDto } from './dto';
import { product, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductsService
  implements ServiceInterface<ProductDto, UpdateProductDto, product>
{
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: ProductDto): Promise<product> {
    return await this.prismaService.product.create({
      data: {
        cost: dto.cost,
        price: dto.price,
        title: dto.title,
        description: dto.description,
        barcode: dto.barcode,
        sku: dto.sku,
        quantity: dto.quantity,
        quantity_threshold: dto.quantityThreshold,

        location: {
          connect: {
            id: dto.locationId,
          },
        },
        category: {
          connect: {
            id: dto.categoryId,
          },
        },
        vendor_invoice: {
          connect: {
            id: dto.vendor_invoiceId,
          },
        },
      },
    });
  }

  async findOne(id: number): Promise<product> {
    return await this.prismaService.product.findFirst({
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

  async findSearch(search: string): Promise<[] | product[]> {
    return await this.prismaService.product.findMany({
      where: {
        OR: [
          {
            title: {
              contains: search,
            },
          },
          {
            barcode: {
              contains: search,
            },
          },
          {
            sku: {
              contains: search,
            },
          },
        ],
        AND: {
          is_deleted: false,
        },
      },
    });
  }

  async findAll(): Promise<[] | product[]> {
    return await this.prismaService.product.findMany({
      where: {
        is_deleted: false,
      },
    });
  }

  async getPage(page: number, limit: number): Promise<object> {
    const startIndex = (page - 1) * limit;

    const products = await this.prismaService.product.findMany({
      skip: startIndex,
      take: limit,
      where: {
        is_deleted: false,
      },
    });

    const findAll = (await this.findAll()).length;

    const pagesCount = findAll <= limit ? 1 : Math.ceil(findAll / limit);
    const remainingPages = pagesCount - page >= 0 ? pagesCount - page : 0;

    return { products, pagesCount, remainingPages };
  }

  async update(id: number, dto: UpdateProductDto): Promise<product> {
    return await this.prismaService.product.update({
      where: {
        id: id,
      },
      data: {
        cost: dto.cost,
        price: dto.price,
        title: dto.title,
        description: dto.description,
        barcode: dto.barcode,
        sku: dto.sku,
        quantity: dto.quantity,
        quantity_threshold: dto.quantityThreshold,

        location: {
          connect: {
            id: dto.locationId,
          },
        },
        category: {
          connect: {
            id: dto.categoryId,
          },
        },
        vendor_invoice: {
          connect: {
            id: dto.vendor_invoiceId,
          },
        },
      },
    });
  }

  async delete(id: number): Promise<product> {
    return await this.prismaService.product.update({
      where: {
        id: id,
      },
      data: {
        is_deleted: true,
      },
    });
  }
}
