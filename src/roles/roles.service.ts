import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { RoleDto, PartialTypedRoleDto } from './dto';
import { role, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RolesService {
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

  async findOne(dto: PartialTypedRoleDto): Promise<role | null> {
    return await this.prismaService.role.findFirst({
      where: {
        OR: [
          {
            id: dto.id,
          },
          {
            title: {
              contains: dto.title,
            },
          },
        ],
      },
    });
  }

  async findAll() {
    return await this.prismaService.role.findMany();
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

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
