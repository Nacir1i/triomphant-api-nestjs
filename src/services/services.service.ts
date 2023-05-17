import { Injectable } from '@nestjs/common';
import { ServiceInterface } from 'src/utils/interfaces';
import { ServiceDto, UpdateServiceDTO } from './dto';
import { service } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ServicesService
  implements ServiceInterface<ServiceDto, UpdateServiceDTO, service>
{
  constructor(private readonly prismaService: PrismaService) {}

  create(dto: ServiceDto): Promise<service> {
    throw new Error('Method not implemented.');
  }

  findOne(id: number): Promise<service> {
    throw new Error('Method not implemented.');
  }

  findSearch(search: string): Promise<[] | service[]> {
    throw new Error('Method not implemented.');
  }

  findAll(): Promise<[] | service[]> {
    throw new Error('Method not implemented.');
  }

  getPage(page: number, limit: number): Promise<object> {
    throw new Error('Method not implemented.');
  }

  update(id: number, dto: UpdateServiceDTO): Promise<service> {
    throw new Error('Method not implemented.');
  }

  delete(id: number): Promise<service> {
    throw new Error('Method not implemented.');
  }
}
