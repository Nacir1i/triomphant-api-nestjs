import { Injectable, NotFoundException } from '@nestjs/common';
import { ServiceInterface } from '../utils/interfaces';
import { MaterialDto, UpdateMaterialDto } from './dto';
import { Prisma, material } from '@prisma/client';
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
        quantity_threshold: dto.quantityThreshold,

        category: {
          connect: {
            id: dto.categoryId,
          },
        },
        location: {
          connect: {
            id: dto.locationId,
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
    try {
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
          quantity_threshold: dto.quantityThreshold,

          category: {
            connect: {
              id: dto.categoryId,
            },
          },
          location: {
            connect: {
              id: dto.locationId,
            },
          },
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(error.meta?.cause);
        }
      }

      throw error;
    }
  }

  async delete(id: number): Promise<material> {
    try {
      return await this.prismaService.material.update({
        where: {
          id: id,
        },
        data: {
          is_deleted: true,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(error.meta?.cause);
        }
      }

      throw error;
    }
  }
}
