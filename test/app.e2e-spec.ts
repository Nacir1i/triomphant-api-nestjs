import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as pactum from 'pactum';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import { LoginDto, SignupDto } from '../src/auth/dto';

describe('App e2e testing', () => {
  let app: INestApplication;
  let prismaService: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );
    await app.init();
    await app.listen(3333);

    prismaService = app.get(PrismaService);

    pactum.request.setBaseUrl('http://localhost:3333');
  });

  afterAll(() => {
    app.close();
  });

  describe('Authentication', () => {
    describe('login', () => {
      const loginDto: LoginDto = {
        username: 'admin',
        password: 'admin',
      };
      const fakeLoginDto: LoginDto = {
        username: 'adminX',
        password: 'admin',
      };

      it('should throw bad request exception', () => {
        return pactum
          .spec()
          .post('/auth/login')
          .withBody({ password: loginDto.password })
          .expectStatus(400);
      });
      it('should throw bad request exception', () => {
        return pactum
          .spec()
          .post('/auth/login')
          .withBody({ username: loginDto.username })
          .expectStatus(400);
      });
      it('should throw unauthorized exception', () => {
        return pactum
          .spec()
          .post('/auth/login')
          .withBody({
            username: fakeLoginDto.username,
            password: fakeLoginDto.password,
          })
          .expectStatus(401);
      });
      it('should login', () => {
        return pactum
          .spec()
          .post('/auth/login')
          .withBody({
            username: loginDto.username,
            password: loginDto.password,
          })
          .expectStatus(200);
      });
    });
  });
});
