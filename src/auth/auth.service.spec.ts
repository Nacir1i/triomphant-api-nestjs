import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto';
import { createMock } from '@golevelup/ts-jest';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let prismaService: PrismaService;

  const dto: LoginDto = {
    username: 'admin',
    password: 'admin',
  };

  const fakeDto: LoginDto = {
    username: 'test',
    password: 'test',
  };

  const user = {
    id: 1,
    username: 'admin',
    password:
      '$argon2id$v=19$m=65536,t=3,p=4$hZIvUcS/c7KtLzZ3BGKwcA$NO0lrVNuktRxTaFLLNR0wslmfAFj/NXEp2/NrK/2hX8',
    first_name: 'user',
    last_name: 'user',
    image_url: null,
    created_at: '2023-05-07T18:31:59.283Z',
    recruited_at: '2023-05-07T18:31:59.283Z',
    birth_date: '2023-05-07T18:31:59.283Z',
    salary: 69420,
    status: null,
    role_id: 1,
    contact_information_id: 1,
    bank_information_id: null,
    is_deleted: false,
  };

  const { password, ...result } = user;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              findUnique: jest.fn().mockReturnValue(user),
              create: jest.fn().mockReturnValue(user),
            },
          },
        },
        {
          provide: ConfigService,
          useValue: createMock<ConfigService>(),
        },
        {
          provide: JwtService,
          useValue: createMock<JwtService>(),
        },
        UserService,
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('login', () => {
    it('should return user object with token', async () => {
      const response = await service.login(dto);

      expect(prismaService.user.findUnique).toHaveBeenCalled();
      expect(response).toEqual({
        token: {},
        user: result,
      });
    });

    it('should throw unauthorized exception', async () => {
      await expect(service.login(fakeDto)).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });
});
