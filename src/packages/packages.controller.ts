import { Controller } from '@nestjs/common';
import { PackagesService } from './packages.service';
import { PackageDto, UpdatePackageDto } from './dto';
import { Renamedpackage } from '@prisma/client';
import { ControllerInterface } from '../utils/interfaces';

@Controller('packages')
export class PackagesController
  implements ControllerInterface<PackageDto, UpdatePackageDto, Renamedpackage>
{
  constructor(private readonly packagesService: PackagesService) {}

  create(dto: PackageDto) {
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

  update(id: number, dto: UpdatePackageDto) {
    throw new Error('Method not implemented.');
  }

  delete(id: number) {
    throw new Error('Method not implemented.');
  }
}
