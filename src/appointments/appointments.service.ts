import { Injectable, NotFoundException } from '@nestjs/common';
import { ServiceInterface } from 'src/utils/interfaces';
import { AppointmentDto, UpdateAppointmentDto } from './dto';
import { Prisma, appointment } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

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
            id: dto.categoryId,
          },
        },
        customer: {
          connect: {
            id: dto.customerId,
          },
        },
        order: {
          connect: {
            id: dto.orderId,
          },
        },
        delivery_invoice: {
          connect: {
            id: dto.deliveryInvoiceId,
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
    try {
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
              id: dto.categoryId,
            },
          },
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(error.meta?.cause);
        }
      }

      throw error;
    }
  }

  async delete(id: number): Promise<appointment> {
    try {
      return await this.prismaService.appointment.update({
        where: {
          id: id,
        },
        data: {
          is_deleted: true,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(error.meta?.cause);
        }
      }

      throw error;
    }
  }
}
