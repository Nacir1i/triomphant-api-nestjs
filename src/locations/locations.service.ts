import { Injectable } from '@nestjs/common';
import { ServiceInterface } from '../utils/interfaces';
import { LocationDto, UpdateLocationDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';
import { location } from '@prisma/client';

@Injectable()
export class LocationsService
  implements ServiceInterface<LocationDto, UpdateLocationDto, location>
{
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: LocationDto): Promise<location> {
    return await this.prismaService.location.create({
      data: {
        title: dto.title,
        address: dto.address,
      },
    });
  }

  async findOne(id: number): Promise<location> {
    return await this.prismaService.location.findFirst({
      where: {
        id: id,
      },
    });
  }

  async findSearch(search: string): Promise<[] | location[]> {
    return await this.prismaService.location.findMany({
      where: {
        OR: [
          {
            title: {
              contains: search,
            },
          },
          {
            address: {
              contains: search,
            },
          },
        ],
      },
    });
  }

  async findAll(): Promise<[] | location[]> {
    return await this.prismaService.location.findMany();
  }

  async getPage(page: number, limit: number): Promise<object> {
    const startIndex = (page - 1) * limit;

    const locations = await this.prismaService.location.findMany({
      skip: startIndex,
      take: limit,
    });

    const findAll = (await this.findAll()).length;

    const pagesCount = findAll <= limit ? 1 : Math.ceil(findAll / limit);
    const remainingPages = pagesCount - page >= 0 ? pagesCount - page : 0;

    return { locations, pagesCount, remainingPages };
  }

  async update(id: number, dto: UpdateLocationDto): Promise<location> {
    return await this.prismaService.location.update({
      where: {
        id: id,
      },
      data: {
        title: dto.title,
        address: dto.address,
      },
    });
  }

  delete(id: number): Promise<location> {
    throw new Error('Method not implemented.');
  }
}
