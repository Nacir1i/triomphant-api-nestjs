import { Injectable } from '@nestjs/common';
import { ServiceInterface } from '../utils/interfaces';
import {
  OrderCommentDto,
  OrderCommentNoteDto,
  OrderDto,
  UpdateOrderDto,
} from './dto';
import {
  Renamedpackage,
  cost_modifier,
  manual_order_content,
  order,
  order_comment,
  order_comment_note,
  order_package,
  order_payment,
  order_product,
  order_service,
} from '@prisma/client';
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

  async findDate(dateMinimum: number): Promise<any[]> {
    return await this.prismaService.order.findMany({
      where: {
        created_at: {
          gte: new Date(dateMinimum),
        },
      },
      include: {
        packages: true,
        payments: true,
        products: true,
        services: true,
        cost_modifier: true,
        manual_content: true,
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

  async createComment(dto: OrderCommentDto): Promise<order_comment> {
    return await this.prismaService.order_comment.create({
      data: {
        content: dto.content,
        metadata: Buffer.from(dto.metadata),
        is_system: dto.is_system,
        notification_id: dto.notification_id,

        order: {
          connect: {
            id: dto.order_id,
          },
        },
        commenter: {
          connect: {
            id: dto.commenter_id,
          },
        },
      },
    });
  }

  async findOrderComments(id: number): Promise<[] | order_comment[]> {
    return await this.prismaService.order_comment.findMany({
      where: {
        order_id: id,
      },
      include: {
        order_comment_note: true,
      },
    });
  }

  async createCommentNote(
    dto: OrderCommentNoteDto,
  ): Promise<order_comment_note> {
    return await this.prismaService.order_comment_note.create({
      data: {
        content: dto.content,
        notification_id: dto.notification_id,

        comment: {
          connect: {
            id: dto.comment_id,
          },
        },
      },
    });
  }
}
