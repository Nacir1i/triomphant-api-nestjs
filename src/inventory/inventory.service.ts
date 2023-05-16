import { Injectable, NotFoundException } from '@nestjs/common';
import { ServiceInterface } from 'src/utils/interfaces';
import { InventoryDto, updateInventoryDto } from './dto';
import { inventory_category, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class InventoryService
  implements
    ServiceInterface<InventoryDto, updateInventoryDto, inventory_category>
{
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: InventoryDto): Promise<inventory_category> {
    return this.prismaService.inventory_category.create({
      data: {
        title: dto.title,
      },
    });
  }

  async findOne(id: number): Promise<inventory_category> {
    return this.prismaService.inventory_category.findFirst({
      where: {
        id: id,
      },
    });
  }

  async findSearch(search: string): Promise<[] | inventory_category[]> {
    return this.prismaService.inventory_category.findMany({
      where: {
        title: {
          contains: search,
        },
      },
    });
  }

  async findAll(): Promise<[] | inventory_category[]> {
    return this.prismaService.inventory_category.findMany();
  }

  async getPage(page: number, limit: number): Promise<object> {
    const startIndex = (page - 1) * limit;

    const inventoryCategories =
      await this.prismaService.inventory_category.findMany({
        skip: startIndex,
        take: limit,
      });

    const findAll = (await this.findAll()).length;

    const pagesCount = findAll <= limit ? 1 : Math.ceil(findAll / limit);
    const remainingPages = pagesCount - page >= 0 ? pagesCount - page : 0;

    return { inventoryCategories, pagesCount, remainingPages };
  }

  async update(
    id: number,
    dto: updateInventoryDto,
  ): Promise<inventory_category> {
    try {
      return await this.prismaService.inventory_category.update({
        where: {
          id: id,
        },
        data: {
          title: dto.title,
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

  delete(id: number): Promise<inventory_category> {
    throw new Error('Method not implemented.');
  }
}
