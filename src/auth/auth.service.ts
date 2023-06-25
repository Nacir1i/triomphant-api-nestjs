import {
  Injectable,
  ForbiddenException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { SignupDto, LoginDto } from './dto';
import * as argon from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
    private readonly userService: UserService,
  ) {}

  async login(dto: LoginDto): Promise<object> {
    const user = await this.userService.findByUserName(dto.username);
    if (!user) {
      throw new UnauthorizedException('Credentials provided are wrong');
    }

    if (!(await argon.verify(user.password, dto.password))) {
      throw new UnauthorizedException('Credentials provided are wrong');
    }

    const signable = { username: user.username, password: user.password };
    const token: string = await this.jwtService.signAsync(signable);

    const { password, ...rest } = user;

    return { user: rest, token };
  }

  async signup(dto: SignupDto): Promise<object | null> {
    const hash = await argon.hash(dto.password);

    const user = await this.prismaService.user.create({
      data: {
        username: dto.username,
        password: hash,
        first_name: dto.first_name,
        last_name: dto.last_name,
        image_url: dto.image_url,
        recruited_at: dto.recruited_at,
        birth_date: dto.birth_date,
        salary: dto.salary,
        status: dto.status,

        role: {
          connect: {
            id: dto.role_id,
          },
        },
        contact_information: {
          create: dto.contact_information,
        },
        bank_information: {
          create: dto.bank_information,
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

    const signable = { username: user.username, password: hash };
    const token: string = await this.jwtService.signAsync(signable);

    return { user, token };
  }
}
