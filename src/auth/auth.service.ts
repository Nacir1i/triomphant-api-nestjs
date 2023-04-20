import {
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';

//Services:
import { user, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
//DTO:
import { SignupDto, LoginDto } from './dto';
//3rd party:
import * as argon from 'argon2';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, private prisma: PrismaService) {}

  async login(dto: LoginDto): Promise<string> {
    return '';
  }

  async signup(dto: SignupDto): Promise<user | null> {
    try {
      const hash = await argon.hash(dto.password);

      const user = await this.prisma.user.create({
        data: {
          username: dto.username,
          password: hash,
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
