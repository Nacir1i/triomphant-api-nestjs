import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto';
import { user } from '@prisma/client';
import { Prisma } from '@prisma/client';

describe('AuthService', () => {
  let service: AuthService;
  let prismaSerivce: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        PrismaService,
        ConfigService,
        JwtService,
        UserService,
      ],
    }).compile();

    service = module.get<AuthService>(AuthController);
  });

  describe('login', () => {
    it('should return user object with token', async () => {
      const dto: LoginDto = {
        username: 'admin',
        password: 'admin',
      };
      const data = {
        id: 1,
        username: 'admin',
        password: 'admin',
        first_name: 'user',
        last_name: 'user',
        image_url: null,
        created_at: new Date(),
        recruited_at: new Date(),
        birth_date: new Date(),
        salary: 69420,
        status: null,
        role_id: 1,
        contact_information_id: 1,
        bank_information_id: null,
        is_deleted: false,
      } as unknown as Prisma.Prisma__userClient<user>;

      jest
        .spyOn(prismaSerivce.user, 'findFirst')
        .mockImplementation(async () => data);

      const result = await service.login(dto);

      expect(result).toEqual(
        expect.objectContaining({ user: data, token: expect.any(String) }),
      );
    });
  });
});
