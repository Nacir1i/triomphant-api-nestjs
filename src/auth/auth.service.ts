import {
  Injectable,
  ForbiddenException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

//Services:
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
//DTO:
import { SignupDto, LoginDto } from './dto';
//3rd party:
import * as argon from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prismaService: PrismaService,
    private userService: UserService,
  ) {}

  async login(dto: LoginDto): Promise<object | null> {
    const user = await this.prismaService.user.findFirst({
      where: {
        username: dto.username,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Credentials provided are wrong');
    }

    if (!(await argon.verify(user.password, dto.password))) {
      throw new UnauthorizedException('Credentials provided are wrong');
    }

    const token: string = await this.jwtService.signAsync(user);

    const { password, ...rest } = user;

    return { user: rest, token };
  }

  async signup(dto: SignupDto): Promise<object | null> {
    try {
      const hash = await argon.hash(dto.password);

      const user = await this.prismaService.user.create({
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
          logs: {
            create: {
              content: 'User created successfully',
            },
          },
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

      const token: string = await this.jwtService.signAsync(user);

      return { user, token };
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

  async assignJwtToken(object: object) {
    return await this.jwtService.signAsync(object);
  }
}
