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

  async create(dto: MaterialDto): Promise<material> {
    return await this.prismaService.material.create({
      data: {
        title: dto.title,
        price: dto.price,
        sku: dto.sku,
        description: dto.description,
        quantity: dto.quantity,
        quantity_threshold: dto.quantity_threshold,

        category: {
          connect: {
            id: dto.category_id,
          },
        },
        location: {
          connect: {
            id: dto.location_id,
          },
        },
      },
    });
  }

  async findOne(id: number): Promise<material> {
    return await this.prismaService.material.findFirst({
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

  async findSearch(search: string): Promise<[] | material[]> {
    return await this.prismaService.material.findMany({
      where: {
        OR: [
          {
            title: {
              contains: search,
            },
          },
          {
            sku: {
              contains: search,
            },
          },
        ],
        AND: {
          is_deleted: false,
        },
      },
    });
  }

  async findAll(): Promise<[] | material[]> {
    return await this.prismaService.material.findMany();
  }

  async getPage(page: number, limit: number): Promise<object> {
    const startIndex = (page - 1) * limit;

    const materials = await this.prismaService.material.findMany({
      skip: startIndex,
      take: limit,
      where: {
        is_deleted: false,
      },
    });

    const findAll = (await this.findAll()).length;

    const pagesCount = findAll <= limit ? 1 : Math.ceil(findAll / limit);
    const remainingPages = pagesCount - page >= 0 ? pagesCount - page : 0;

    return { materials, pagesCount, remainingPages };
  }

  async update(id: number, dto: UpdateMaterialDto): Promise<material> {
    return await this.prismaService.material.update({
      where: {
        id: id,
      },
      data: {
        title: dto.title,
        price: dto.price,
        sku: dto.sku,
        description: dto.description,
        quantity: dto.quantity,
        quantity_threshold: dto.quantity_threshold,

        category: {
          connect: {
            id: dto.category_id,
          },
        },
        location: {
          connect: {
            id: dto.location_id,
          },
        },
      },
    });
  }

  async delete(id: number): Promise<material> {
    return await this.prismaService.material.update({
      where: {
        id: id,
      },
      data: {
        is_deleted: true,
      },
    });
  }
}
