import { Injectable } from '@nestjs/common';
import { ServiceInterface } from '../utils/interfaces';
import { AppointmentDto, UpdateAppointmentDto } from './dto';
import { appointment } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import * as dayjs from 'dayjs';

interface DashboardStats {
  total: number;
  done: number;
  running: number;
}

@Injectable()
export class AppointmentsService
  implements
    ServiceInterface<AppointmentDto, UpdateAppointmentDto, appointment>
{
  private readonly MONTH_TIME = 86_400_000;

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

  async findMonth(
    date: string = new Date().toISOString(),
  ): Promise<[] | appointment[]> {
    const startOfMonth = new Date(
      new Date(date).getFullYear(),
      new Date(date).getMonth(),
      1,
    );
    const endOfMonth = new Date(
      new Date(date).getFullYear(),
      new Date(date).getMonth() + 1,
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
    const appointments = await this.findMonth(date);

    const currentDate: dayjs.Dayjs = dayjs(date);
    const daysInMonth: number = currentDate.daysInMonth();
    let week: Object[] | null = [];
    let month: (typeof week)[] = [];

    for (let i = 1; i <= daysInMonth; i++) {
      const dateStart: dayjs.Dayjs = dayjs(currentDate).date(i).startOf('day');

      const day: string = dateStart.format('dddd');
      const date: dayjs.Dayjs = dateStart.set('date', i).startOf('day');
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

  async getStats(): Promise<null | object> {
    const date_origin = Date.now();
    const date_minimum = date_origin - this.MONTH_TIME;

    const appointments = await this.prismaService.appointment.findMany({
      where: {
        is_deleted: false,
        created_at: {
          gte: new Date(date_minimum),
        },
      },
    });

    return {
      meta: {
        date_origin,
        date_minimum,
      },
      stats: {
        total: appointments.length,
      },
    };
  }

  async getDashboardStats(dateMinimum: number): Promise<DashboardStats> {
    const dateStart = new Date(dateMinimum);
    const appointments = await this.prismaService.appointment.findMany({
      where: {
        AND: [{ is_deleted: false }, { created_at: { gte: dateStart } }],
      },
      select: {
        status: true,
        due_date: true,
      },
    });

    let [counter_appointments_done, counter_appointments_running] = [0, 0];
    appointments.forEach((appointment) => {
      if (appointment.status === 3) {
        counter_appointments_done += 1;
      } else {
        counter_appointments_running += 1;
      }
    });

    return {
      done: counter_appointments_done,
      running: counter_appointments_running,
      total: appointments.length,
    };
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
