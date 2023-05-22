import { Injectable } from '@nestjs/common';
import { ServiceInterface } from '../utils/interfaces';
import { ServiceDto, UpdateServiceDTO } from './dto';
import { service } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ServicesService
  implements ServiceInterface<ServiceDto, UpdateServiceDTO, service>
{
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: ServiceDto): Promise<service> {
    return await this.prismaService.service.create({
      data: {
        title: dto.title,
        description: dto.description,
        cost: dto.cost,
        price: dto.price,

        category: {
          connect: {
            id: dto.category_id,
          },
        },
      },
    });
  }

  async findOne(id: number): Promise<service> {
    return await this.prismaService.service.findFirst({
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

  async findSearch(search: string): Promise<[] | service[]> {
    return await this.prismaService.service.findMany({
      where: {
        OR: [{}],
        AND: {
          is_deleted: false,
        },
      },
    });
  }

  async findAll(): Promise<[] | service[]> {
    return await this.prismaService.service.findMany();
  }

  async getPage(page: number, limit: number): Promise<object> {
    const startIndex = (page - 1) * limit;

    const services = await this.prismaService.service.findMany({
      skip: startIndex,
      take: limit,
      where: {
        is_deleted: false,
      },
    });

    const findAll = (await this.findAll()).length;

    const pagesCount = findAll <= limit ? 1 : Math.ceil(findAll / limit);
    const remainingPages = pagesCount - page >= 0 ? pagesCount - page : 0;

    return { services, pagesCount, remainingPages };
  }

  async update(id: number, dto: UpdateServiceDTO): Promise<service> {
    return await this.prismaService.service.update({
      where: {
        id: id,
      },
      data: {
        title: dto.title,
        description: dto.description,
        cost: dto.cost,
        price: dto.price,

        category: {
          connect: {
            id: dto.category_id,
          },
        },
      },
    });
  }

  async delete(id: number): Promise<service> {
    return await this.prismaService.service.update({
      where: {
        id: id,
      },
      data: {
        is_deleted: true,
      },
    });
  }
}
