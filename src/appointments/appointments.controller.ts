import { Controller } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { ControllerInterface } from 'src/utils/interfaces';
import { AppointmentDto, UpdateAppointmentDto } from './dto';
import { appointment } from '@prisma/client';

@Controller('appointments')
export class AppointmentsController
  implements
    ControllerInterface<AppointmentDto, UpdateAppointmentDto, appointment>
{
  constructor(private readonly appointmentsService: AppointmentsService) {}

  create(dto: AppointmentDto) {
    throw new Error('Method not implemented.');
  }

  findOne(id: number) {
    throw new Error('Method not implemented.');
  }

  findSearch(search: string) {
    throw new Error('Method not implemented.');
  }

  findAll() {
    throw new Error('Method not implemented.');
  }

  getPage(page: number, limit: number) {
    throw new Error('Method not implemented.');
  }

  update(id: number, dto: UpdateAppointmentDto) {
    throw new Error('Method not implemented.');
  }

  delete(id: number) {
    throw new Error('Method not implemented.');
  }
}
