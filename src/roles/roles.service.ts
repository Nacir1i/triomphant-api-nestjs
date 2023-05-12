import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { RoleDto, PartialTypedRoleDto } from './dto';
import { role, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { ServiceInterface } from '../utils/interfaces';

@Injectable()
export class RolesService
  implements ServiceInterface<RoleDto, PartialTypedRoleDto, role>
{
  constructor(private prismaService: PrismaService) {}

  async create(dto: RoleDto): Promise<role> {
    try {
      const role = await this.prismaService.role.create({
        data: {
          title: dto.title,
        },
      });

      return role;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Role already exists');
        }
      }
      throw error;
    }
  }

  async findOne(id: number): Promise<role | null> {
    const role = await this.prismaService.role.findUnique({
      where: {
        id: id,
      },
    });

    return role;
  }

  async findSearch(search: string): Promise<role[] | []> {
    const role = await this.prismaService.role.findMany({
      where: {
        AND: [
          {
            title: {
              contains: search,
            },
          },
          {
            is_deleted: false,
          },
        ],
      },
    });

    return role;
  }

  async findAll() {
    return await this.prismaService.role.findMany({
      where: {
        is_deleted: false,
      },
    });
  }

  getPage(page: number, limit: number): object {
    return {};
  }

  async update(id: number, dto: PartialTypedRoleDto) {
    try {
      const role = await this.prismaService.role.update({
        where: {
          id: id,
        },
        data: {
          title: dto.title,
        },
      });

      return role;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException('Role was not found');
        }
      }
      throw error;
    }
  }

  async delete(id: number) {
    try {
      const role = await this.prismaService.role.update({
        where: {
          id: id,
        },
        data: {
          is_deleted: true,
        },
      });

      return role;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException('Role was not found');
        }
      }
      throw error;
    }
  }
}
