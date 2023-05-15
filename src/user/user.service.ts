import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserDto, PartialTypedUser } from './dto';
import { ServiceInterface } from '../utils/interfaces';
import { JwtService } from '@nestjs/jwt';
import { user, Prisma } from '@prisma/client';

@Injectable()
export class UserService
  implements ServiceInterface<UserDto, PartialTypedUser, user>
{
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async create(dto: UserDto): Promise<user> {
    throw new Error('Method not implemented.');
  }

  async findOne(id: number): Promise<user> {
    return await this.prismaService.user.findFirst({
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
      include: {
        contact_information: true,
        bank_information: true,
      },
    });
  }

  async findSearch(search: string): Promise<[] | user[]> {
    return await this.prismaService.user.findMany({
      where: {
        OR: [
          {
            username: {
              contains: search,
            },
          },
          {
            first_name: {
              contains: search,
            },
          },
          {
            last_name: {
              contains: search,
            },
          },
          {
            contact_information: {
              email: {
                contains: search,
              },
            },
          },
        ],
        AND: {
          is_deleted: false,
        },
      },
      include: {
        contact_information: true,
        bank_information: true,
      },
    });
  }

  async findAll(): Promise<[] | user[]> {
    return await this.prismaService.user.findMany();
  }

  async getPage(page: number, limit: number) {
    const startIndex = (page - 1) * limit;

    const employees = await this.prismaService.user.findMany({
      skip: startIndex,
      take: limit,
      where: {
        is_deleted: false,
      },
      include: {
        contact_information: true,
        bank_information: true,
      },
    });

    const findAll = (await this.findAll()).length;

    const pagesCount = findAll <= limit ? 1 : Math.ceil(findAll / limit);
    const remainingPages = pagesCount - page >= 0 ? pagesCount - page : 0;

    return { employees, pagesCount, remainingPages };
  }

  async update(id: number, dto: PartialTypedUser): Promise<user> {
    try {
      return await this.prismaService.user.update({
        where: {
          id: id,
        },
        data: {
          first_name: dto.firstName,
          last_name: dto.lastName,
          contact_information: {
            update: {
              email: dto.email,
              phone: dto.phone,
              address: dto.address,
              honorific: dto.honorific,
              emergency: dto.emergency,
            },
          },
          bank_information: {
            upsert: {
              create: {
                name: dto.name,
                number: dto.number,
                rib: dto.rib,
                swift: dto.swift,
                ice: dto.ice,
              },
              update: {
                name: dto.name,
                number: dto.number,
                rib: dto.rib,
                swift: dto.swift,
                ice: dto.ice,
              },
            },
          },
        },
        include: {
          contact_information: true,
          bank_information: true,
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

  async delete(id: number): Promise<user> {
    try {
      return await this.prismaService.user.update({
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
