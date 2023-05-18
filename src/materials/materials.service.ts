import { Injectable } from '@nestjs/common';
import { ServiceInterface } from '../utils/interfaces';
import { MaterialDto, UpdateMaterialDto } from './dto';
import { material } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MaterialsService
  implements ServiceInterface<MaterialDto, UpdateMaterialDto, material>
{
  constructor(private readonly prismaService: PrismaService) {}

  create(dto: MaterialDto): Promise<material> {
    throw new Error('Method not implemented.');
  }

  findOne(id: number): Promise<material> {
    throw new Error('Method not implemented.');
  }

  findSearch(search: string): Promise<[] | material[]> {
    throw new Error('Method not implemented.');
  }

  findAll(): Promise<[] | material[]> {
    throw new Error('Method not implemented.');
  }

  getPage(page: number, limit: number): Promise<object> {
    throw new Error('Method not implemented.');
  }

  update(id: number, dto: UpdateMaterialDto): Promise<material> {
    throw new Error('Method not implemented.');
  }

  delete(id: number): Promise<material> {
    throw new Error('Method not implemented.');
  }
}
