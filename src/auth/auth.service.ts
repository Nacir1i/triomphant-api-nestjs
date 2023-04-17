import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async login(): Promise<any> {
    return { message: 'test' };
  }

  async signup(): Promise<any> {
    return { message: 'test' };
  }
}
