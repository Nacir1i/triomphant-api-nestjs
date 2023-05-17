import { Controller } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ControllerInterface } from 'src/utils/interfaces';
import { ServiceDto, UpdateServiceDTO } from './dto';
import { service } from '@prisma/client';

@Controller('services')
export class ServicesController
  implements ControllerInterface<ServiceDto, UpdateServiceDTO, service>
{
  constructor(private readonly servicesService: ServicesService) {}

  create(dto: ServiceDto) {
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

  update(id: number, dto: UpdateServiceDTO) {
    throw new Error('Method not implemented.');
  }

  delete(id: number) {
    throw new Error('Method not implemented.');
  }
}
