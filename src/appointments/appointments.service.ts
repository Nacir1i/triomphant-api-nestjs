import { Injectable } from '@nestjs/common';
import { ServiceInterface } from 'src/utils/interfaces';
import { AppointmentDto, UpdateAppointmentDto } from './dto';
import { appointment } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AppointmentsService
  implements
    ServiceInterface<AppointmentDto, UpdateAppointmentDto, appointment>
{
  constructor(private readonly prismaService: PrismaService) {}

  create(dto: AppointmentDto): Promise<appointment> {
    throw new Error('Method not implemented.');
  }

  findOne(id: number): Promise<appointment> {
    throw new Error('Method not implemented.');
  }

  findSearch(search: string): Promise<[] | appointment[]> {
    throw new Error('Method not implemented.');
  }

  findAll(): Promise<[] | appointment[]> {
    throw new Error('Method not implemented.');
  }

  getPage(page: number, limit: number): Promise<object> {
    throw new Error('Method not implemented.');
  }

  update(id: number, dto: UpdateAppointmentDto): Promise<appointment> {
    throw new Error('Method not implemented.');
  }

  delete(id: number): Promise<appointment> {
    throw new Error('Method not implemented.');
  }
}
