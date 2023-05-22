import { Injectable } from '@nestjs/common';
import { ServiceInterface } from '../utils/interfaces';
import { PackageDto, UpdatePackageDto } from './dto';
import { Renamedpackage } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { constructUpdateMany } from '../utils/common';

@Injectable()
export class PackagesService
  implements ServiceInterface<PackageDto, UpdatePackageDto, Renamedpackage>
{
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: PackageDto): Promise<Renamedpackage> {
    return await this.prismaService.renamedpackage.create({
      data: {
        title: dto.title,
        description: dto.description,
        price: dto.price,

        category: {
          connect: {
            id: dto.category_id,
          },
        },

        products: {
          create: dto.products,
        },
        services: {
          create: dto.services,
        },
        manual_content: {
          create: dto.manualContent,
        },
      },
    });
  }

  async findOne(id: number): Promise<Renamedpackage> {
    return await this.prismaService.renamedpackage.findFirst({
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

  async findSearch(search: string): Promise<[] | Renamedpackage[]> {
    return await this.prismaService.renamedpackage.findMany({
      where: {
        OR: [
          {
            title: {
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

  async findAll(): Promise<[] | Renamedpackage[]> {
    return await this.prismaService.renamedpackage.findMany();
  }

  async getPage(page: number, limit: number): Promise<object> {
    const startIndex = (page - 1) * limit;

    const packages = await this.prismaService.renamedpackage.findMany({
      skip: startIndex,
      take: limit,
      where: {
        is_deleted: false,
      },
      include: {
        products: true,
        services: true,
        manual_content: true,
      },
    });

    const findAll = (await this.findAll()).length;

    const pagesCount = findAll <= limit ? 1 : Math.ceil(findAll / limit);
    const remainingPages = pagesCount - page >= 0 ? pagesCount - page : 0;

    return { packages, pagesCount, remainingPages };
  }

  async update(id: number, dto: UpdatePackageDto): Promise<Renamedpackage> {
    const updateManyProductQuery = constructUpdateMany(
      dto.updateProducts.update,
      'product_id',
    );
    const updateManyServiceQuery = constructUpdateMany(
      dto.updateServices.update,
      'service_id',
    );
    const updateManyManualQuery = constructUpdateMany(
      dto.updateManualContent.update,
      'id',
    );

    return await this.prismaService.renamedpackage.update({
      where: {
        id: id,
      },
      data: {
        title: dto.title,
        description: dto.description,
        price: dto.price,

        category: {
          connect: {
            id: dto.category_id,
          },
        },

        products: {
          create: dto.updateProducts.add,
          updateMany: updateManyProductQuery,
          deleteMany: dto.updateProducts.delete,
        },
        services: {
          create: dto.updateServices.add,
          updateMany: updateManyServiceQuery,
          deleteMany: dto.updateServices.delete,
        },
        manual_content: {
          create: dto.updateManualContent.add,
          updateMany: updateManyManualQuery,
          deleteMany: dto.updateManualContent.delete,
        },
      },
    });
  }

  async delete(id: number): Promise<Renamedpackage> {
    return await this.prismaService.renamedpackage.update({
      where: {
        id: id,
      },
      data: {
        is_deleted: true,
      },
    });
  }
}
