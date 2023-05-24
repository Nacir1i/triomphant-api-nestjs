import { Injectable } from '@nestjs/common';
import { ServiceInterface } from '../utils/interfaces';
import { AppointmentDto, UpdateAppointmentDto } from './dto';
import { appointment } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import dayjs, { Dayjs } from 'dayjs';

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
            id: dto.delivery_invoice_id,
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

  async findCurrentMonth(): Promise<[] | appointment[]> {
    const startOfMonth = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      1,
    );
    const endOfMonth = new Date(
      new Date().getFullYear(),
      new Date().getMonth() + 1,
      0,
    );

    return await this.prismaService.appointment.findMany({
      where: {
        due_date: {
          gte: startOfMonth,
          lte: endOfMonth,
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

  async getCalendarPage(date: string) {
    const appointments = await this.findCurrentMonth();

    const currentDate: Dayjs = dayjs(date);
    const daysInMonth: number = currentDate.daysInMonth();
    let week: Array<Object | null> = [];
    let month: Array<typeof week> = [];

    for (let i = 1; i <= daysInMonth; i++) {
      const dateStart: Dayjs = dayjs(currentDate).date(i).startOf('day');

      const day: string = dateStart.format('dddd');
      const date: Dayjs = dateStart.set('date', i).startOf('day');
      const dayOfMonth: number = dateStart.date();
      const index: number = dateStart.day();

      const matchedDates = appointments.filter((appointment: appointment) =>
        date.isSame(appointment.due_date, 'day'),
      );

      week = [...week, { index: dayOfMonth, day, date, data: matchedDates }];
      if (index === 6 || i >= daysInMonth) {
        month = [...month, week];
        week = [];
      }
    }

    const firstWeek: (Object | null)[] = month[0];
    const missingFirstWeeksDays: number = 7 - firstWeek.length;

    for (let j = 0; j < missingFirstWeeksDays; j++) {
      firstWeek.unshift(null);
    }

    const lastWeek: (Object | null)[] = month[month.length - 1];
    const missingLastWeeksDays: number = 7 - lastWeek.length;

    for (let j = 0; j < missingLastWeeksDays; j++) {
      lastWeek.push(null);
    }

    if (6 - month.length) {
      month.push([null, null, null, null, null, null, null]);
    }

    return month;
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
