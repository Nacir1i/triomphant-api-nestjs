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
    return await this.prismaService.role.create({
      data: {
        title: dto.title,
      },
    });
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
        title: {
          contains: search,
        },
      },
    });

    return role;
  }

  async findAll() {
    return await this.prismaService.role.findMany();
  }

  async getPage(page: number, limit: number): Promise<object> {
    return {};
  }

  async update(id: number, dto: PartialTypedRoleDto) {
    const role = await this.prismaService.role.update({
      where: {
        id: id,
      },
      data: {
        title: dto.title,
      },
    });

    return role;
  }

  delete(id: number): Promise<role> {
    throw new Error('Method not implemented.');
  }
}
