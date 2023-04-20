import {
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SignupDto, LoginDto } from './dto';
import { user, Prisma } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async login(dto: LoginDto): Promise<any> {
    return { dto };
  }

  async signup(dto: SignupDto): Promise<user | null> {
    try {
      const user = await this.prisma.user.create({
        data: {
          username: dto.username,
          password: dto.password,
          first_name: dto.firstName,
          last_name: dto.lastName,
          image_url: dto.imageUrl,
          recruited_at: dto.recruitedAt,
          birth_date: dto.birthDate,
          salary: dto.salary,
          status: dto.status,

          role: {
            connect: {
              id: dto.roleId,
            },
          },
          contact_information: {
            create: dto.contactInformation,
          },
          bank_information: {
            create: dto.bankInformation,
          },
        },
      });

      return user;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        } else if (error.code === 'P2025') {
          throw new NotFoundException('Role was not found');
        }
      }
      throw error;
    }
  }
}
