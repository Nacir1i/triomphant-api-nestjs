import { Controller } from '@nestjs/common';
import { MaterialsService } from './materials.service';
import { ControllerInterface } from '../utils/interfaces';
import { MaterialDto, UpdateMaterialDto } from './dto';
import { material } from '@prisma/client';

@Controller('materials')
export class MaterialsController
  implements ControllerInterface<MaterialDto, UpdateMaterialDto, material>
{
  constructor(private readonly materialsService: MaterialsService) {}

  create(dto: MaterialDto) {
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

  update(id: number, dto: UpdateMaterialDto) {
    throw new Error('Method not implemented.');
  }

  delete(id: number) {
    throw new Error('Method not implemented.');
  }
}
