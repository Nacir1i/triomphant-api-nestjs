import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ServiceInterface } from '../utils/interfaces';
import { ChangePasswordUser, UserDto, PartialTypedUser } from './dto';
import { JwtService } from '@nestjs/jwt';
import { user } from '@prisma/client';

import { hash as argon_hash, verify as argon_verify } from 'argon2';

@Injectable()
export class UserService
  implements ServiceInterface<UserDto, PartialTypedUser, user>
{
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) { }

  async create(dto: UserDto): Promise<user> {
    throw new Error('Method not implemented.');
  }

  async findOne(id: number): Promise<user> {
    const user = await this.prismaService.user.findFirst({
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

    delete user.password;

    return user;
  }

  async findByUserName(userName: string): Promise<user> {
    return await this.prismaService.user.findFirst({
      where: {
        AND: [
          {
            username: userName,
          },
          {
            is_deleted: false,
          },
        ],
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
    const bank_information = { name: dto.name, number: dto.number, rib: dto.rib, swift: dto.swift, ice: dto.ice }
    const contact_information = { email: dto.email, phone: dto.phone, address: dto.address, honorific: dto.honorific, emergency: dto.emergency }

    return await this.prismaService.user.update({
      where: { id },
      data: {
        first_name: dto.first_name,
        last_name: dto.last_name,
        image_url: dto.image_url,
        is_deleted: dto.is_deleted,
        contact_information: {
          update: contact_information,
        },
        bank_information: {
          upsert: {
            create: bank_information,
            update: bank_information,
          },
        },
      },
      include: {
        contact_information: true,
        bank_information: true,
      },
    });
  }

  async password_reset(id: number, dto: ChangePasswordUser): Promise<Object> {
    const { new_password, old_password } = dto
    const user = await this.prismaService.user.findUnique({ where: { id } })
    if (!(await argon_verify(user.password, old_password))) {
      throw new UnauthorizedException('Credentials provided are wrong');
    }

    const new_hash = await argon_hash(new_password)
    await this.prismaService.user.update({
      where: { id },
      data: { password: new_hash },
    })
    const signable = { username: user.username, password: new_hash }
    const token: string = await this.jwtService.signAsync(signable)
    {
      const { password, ..._user } = user
      return { token, user: _user }
    }
  }

  async delete(id: number): Promise<user> {
    return await this.prismaService.user.update({
      where: { id },
      data: { is_deleted: true },
    });
  }
}
