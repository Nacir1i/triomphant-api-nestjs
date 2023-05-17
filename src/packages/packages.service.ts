import { Injectable } from '@nestjs/common';
import { ServiceInterface } from '../utils/interfaces';
import { PackageDto, UpdatePackageDto } from './dto';
import { Renamedpackage } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PackagesService
  implements ServiceInterface<PackageDto, UpdatePackageDto, Renamedpackage>
{
  constructor(private readonly prismaService: PrismaService) {}

  create(dto: PackageDto): Promise<Renamedpackage> {
    throw new Error('Method not implemented.');
  }

  findOne(id: number): Promise<Renamedpackage> {
    throw new Error('Method not implemented.');
  }

  findSearch(search: string): Promise<[] | Renamedpackage[]> {
    throw new Error('Method not implemented.');
  }

  findAll(): Promise<[] | Renamedpackage[]> {
    throw new Error('Method not implemented.');
  }

  getPage(page: number, limit: number): Promise<object> {
    throw new Error('Method not implemented.');
  }

  update(id: number, dto: UpdatePackageDto): Promise<Renamedpackage> {
    throw new Error('Method not implemented.');
  }

  delete(id: number): Promise<Renamedpackage> {
    throw new Error('Method not implemented.');
  }
}
