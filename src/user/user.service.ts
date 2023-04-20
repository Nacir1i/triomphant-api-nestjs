import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserDto } from './dto';
import { user } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async getUser(dto: UserDto): Promise<user | null> {
    const user = await this.prismaService.user.findFirst({
      where: {
        OR: [
          {
            id: dto.id,
          },
          {
            username: dto.username,
          },
          {
            first_name: dto.firstName,
          },
          {
            last_name: dto.lastName,
          },
          {
            contact_information: {
              email: dto.email,
            },
          },
          {
            contact_information: {
              phone: dto.phone,
            },
          },
        ],
      },
    });

    return user;
  }
}
