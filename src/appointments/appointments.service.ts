import { Injectable } from '@nestjs/common';
import { ServiceInterface } from '../utils/interfaces';
import { AppointmentDto, UpdateAppointmentDto } from './dto';
import { appointment } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AppointmentsService
  implements
    ServiceInterface<AppointmentDto, UpdateAppointmentDto, appointment>
{
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: AppointmentDto): Promise<appointment> {
    return await this.prismaService.appointment.create({
      data: {
        title: dto.title,
        status: dto.status,
        due_date: dto.due_date,

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
        delivery_invoice: {
          connect: {
            id: dto.deliveryInvoice_id,
          },
        },
      },
    });
  }

  async findOne(id: number): Promise<appointment> {
    return await this.prismaService.appointment.findFirst({
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

  async findSearch(search: string): Promise<[] | appointment[]> {
    return await this.prismaService.appointment.findMany({
      where: {
        OR: {
          title: {
            contains: search,
          },
        },
        AND: {
          is_deleted: false,
        },
      },
    });
  }

  async findAll(): Promise<[] | appointment[]> {
    return await this.prismaService.appointment.findMany();
  }

  async getPage(page: number, limit: number): Promise<object> {
    const startIndex = (page - 1) * limit;

    const appointments = await this.prismaService.appointment.findMany({
      skip: startIndex,
      take: limit,
      where: {
        is_deleted: false,
      },
      include: {
        customer: true,
        category: true,
        order: true,
        delivery_invoice: true,
      },
    });

    const findAll = (await this.findAll()).length;

    const pagesCount = findAll <= limit ? 1 : Math.ceil(findAll / limit);
    const remainingPages = pagesCount - page >= 0 ? pagesCount - page : 0;

    return { appointments, pagesCount, remainingPages };
  }

  async update(id: number, dto: UpdateAppointmentDto): Promise<appointment> {
    return await this.prismaService.appointment.update({
      where: {
        id: id,
      },
      data: {
        title: dto.title,
        status: dto.status,
        due_date: dto.due_date,

        category: {
          connect: {
            id: dto.category_id,
          },
        },
      },
    });
  }

  async delete(id: number): Promise<appointment> {
    return await this.prismaService.appointment.update({
      where: {
        id: id,
      },
      data: {
        is_deleted: true,
      },
    });
  }
}
