import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserDto, PartialTypedUser } from './dto';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async getUser(dto: PartialTypedUser): Promise<object | null> {
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
      select: {
        username: true,
        first_name: true,
        last_name: true,
        role: true,
        contact_information: true,
        bank_information: true,
      },
    });

    return user;
  }
}
