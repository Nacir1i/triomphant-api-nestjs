import { Injectable, NotFoundException } from '@nestjs/common';
import { ServiceInterface } from '../utils/interfaces';
import { OrderDto, UpdateOrderDto } from './dto';
import { Prisma, order } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { constructUpdateMany } from '../utils/common';

@Injectable()
export class OrdersService
  implements ServiceInterface<OrderDto, UpdateOrderDto, order>
{
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: OrderDto): Promise<order> {
    return await this.prismaService.order.create({
      data: {
        ref: dto.ref,
        title: dto.title,
        paid: dto.paid,
        price: dto.price,
        note: dto.note,
        delivery_address: dto.deliveryAddress,
        due_date: dto.dueDate,
        status: dto.status,

        category: {
          connect: {
            id: dto.categoryId,
          },
        },
        customer: {
          connect: {
            id: dto.customerId,
          },
        },
        quote: {
          connect: {
            id: dto.quoteId,
          },
        },

        cost_modifier: {
          create: {
            shipping: dto.costModifier.shipping,
            discount: dto.costModifier.discount,
            is_discount_percentage: dto.costModifier.is_discount_percentage,
            tax: dto.costModifier.tax,
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

  async findOne(id: number): Promise<order> {
    return await this.prismaService.order.findFirst({
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

  async findSearch(search: string): Promise<[] | order[]> {
    return await this.prismaService.order.findMany({
      where: {
        OR: [
          {
            ref: {
              contains: search,
            },
            title: {
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

  async findAll(): Promise<[] | order[]> {
    return await this.prismaService.order.findMany();
  }

  async getPage(page: number, limit: number): Promise<object> {
    const startIndex = (page - 1) * limit;

    const order = await this.prismaService.order.findMany({
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
        quote: true,
        category: true,
      },
    });

    const findAll = (await this.findAll()).length;

    const pagesCount = findAll <= limit ? 1 : Math.ceil(findAll / limit);
    const remainingPages = pagesCount - page >= 0 ? pagesCount - page : 0;

    return { order, pagesCount, remainingPages };
  }

  async update(id: number, dto: UpdateOrderDto): Promise<order> {
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

    return await this.prismaService.order.update({
      where: {
        id: id,
      },
      data: {
        ref: dto.ref,
        title: dto.title,
        paid: dto.paid,
        price: dto.price,
        note: dto.note,
        delivery_address: dto.deliveryAddress,
        due_date: dto.dueDate,
        status: dto.status,

        category: {
          connect: {
            id: dto.categoryId,
          },
        },
        customer: {
          connect: {
            id: dto.customerId,
          },
        },
        quote: {
          connect: {
            id: dto.quoteId,
          },
        },

        cost_modifier: {
          update: {
            shipping: dto.costModifier.shipping,
            discount: dto.costModifier.discount,
            is_discount_percentage: dto.costModifier.is_discount_percentage,
            tax: dto.costModifier.tax,
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

  async delete(id: number): Promise<order> {
    return await this.prismaService.order.update({
      where: {
        id: id,
      },
      data: {
        is_deleted: true,
      },
    });
  }
}
