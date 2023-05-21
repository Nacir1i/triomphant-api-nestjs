import { Injectable, NotFoundException } from '@nestjs/common';
import { ServiceInterface } from '../utils/interfaces';
import { DeliveryInvoiceDto, UpdateDeliveryInvoiceDto } from './dto';
import { Prisma, delivery_invoice } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { constructUpdateMany } from '../utils/common';

@Injectable()
export class DeliveryInvoiceService
  implements
    ServiceInterface<
      DeliveryInvoiceDto,
      UpdateDeliveryInvoiceDto,
      delivery_invoice
    >
{
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: DeliveryInvoiceDto): Promise<delivery_invoice> {
    return await this.prismaService.delivery_invoice.create({
      data: {
        title: dto.title,
        note: dto.note,
        status: dto.status,

        orders: {
          connect: {
            id: dto.orderId,
          },
        },
        materials: {
          create: dto.materials,
        },
        employees: {
          create: dto.employees,
        },
      },
    });
  }

  async findOne(id: number): Promise<delivery_invoice> {
    return await this.prismaService.delivery_invoice.findFirst({
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

  async findSearch(search: string): Promise<[] | delivery_invoice[]> {
    return await this.prismaService.delivery_invoice.findMany({
      where: {
        OR: [
          {
            title: {
              contains: search,
            },
            note: {
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

  async findAll(): Promise<[] | delivery_invoice[]> {
    return await this.prismaService.delivery_invoice.findMany();
  }

  async getPage(page: number, limit: number): Promise<object> {
    const startIndex = (page - 1) * limit;

    const deliveryInvoice = await this.prismaService.delivery_invoice.findMany({
      skip: startIndex,
      take: limit,
      where: {
        is_deleted: false,
      },
      include: {
        materials: true,
        manual_content: true,
        employees: true,
        orders: true,
      },
    });

    const findAll = (await this.findAll()).length;

    const pagesCount = findAll <= limit ? 1 : Math.ceil(findAll / limit);
    const remainingPages = pagesCount - page >= 0 ? pagesCount - page : 0;

    return { deliveryInvoice, pagesCount, remainingPages };
  }

  async update(
    id: number,
    dto: UpdateDeliveryInvoiceDto,
  ): Promise<delivery_invoice> {
    const updateManyManualQuery = constructUpdateMany(
      dto.updateManualContent.update,
      'id',
    );
    const updateMaterialQuery = constructUpdateMany(
      dto.updateManualContent.update,
      'id',
    );
    const updateEmployeeQuery = constructUpdateMany(
      dto.updateManualContent.update,
      'user_id',
    );
    return await this.prismaService.delivery_invoice.update({
      where: {
        id: id,
      },
      data: {
        title: dto.title,
        note: dto.note,
        status: dto.status,

        orders: {
          connect: {
            id: dto.orderId,
          },
        },

        materials: {
          create: dto.updateMaterial.add,
          updateMany: updateMaterialQuery,
          deleteMany: dto.updateMaterial.delete,
        },
        manual_content: {
          create: dto.updateManualContent.add,
          updateMany: updateManyManualQuery,
          deleteMany: dto.updateManualContent.delete,
        },
        employees: {
          create: dto.updateEmployee.add,
          updateMany: updateEmployeeQuery,
          deleteMany: dto.updateEmployee.delete,
        },
      },
    });
  }

  async delete(id: number): Promise<delivery_invoice> {
    return await this.prismaService.delivery_invoice.update({
      where: {
        id: id,
      },
      data: {
        is_deleted: true,
      },
    });
  }
}
