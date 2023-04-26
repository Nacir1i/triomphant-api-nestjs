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

    describe('signup', () => {
      const signupDto: SignupDto = {
        username: 'user1',
        password: 'user1',
        firstName: 'lol',
        lastName: 'lmao',
        roleId: 1,
        imageUrl: '1',
        recruitedAt: '2023-04-26T00:26:01.344Z',
        birthDate: '2023-04-26T00:26:01.344Z',
        salary: 69420,
        status: 1,
        contactInformation: {
          phone: 'fsdfsdf',
          email: 'dfsdff@sdfd.fsdf',
          address: 'dfsdff@sdfd.fsdf',
          honorific: 'dfsdff@sdfd.fsdf',
          emergency: false,
        },
        bankInformation: {
          name: 'bank',
          number: 'djqksndjkqsd',
          rib: 'kkldf',
          ice: 'ksmdf',
          swift: 'kfmsdkmlfsdf',
        },
      };
      const fakeSignupDto: SignupDto = {
        username: 'admin',
        password: 'admin',
        firstName: 'lol',
        lastName: 'lmao',
        roleId: 1,
        imageUrl: '1',
        recruitedAt: '2023-04-26T00:26:01.344Z',
        birthDate: '2023-04-26T00:26:01.344Z',
        salary: 69420,
        status: 1,
        contactInformation: {
          phone: 'fsdfsdf',
          email: 'dfsdff@sdfd.fsdf',
          address: 'dfsdff@sdfd.fsdf',
          honorific: 'dfsdff@sdfd.fsdf',
          emergency: false,
        },
        bankInformation: {
          name: 'bank',
          number: 'djqksndjkqsd',
          rib: 'kkldf',
          ice: 'ksmdf',
          swift: 'kfmsdkmlfsdf',
        },
      };
      it('should throw bad request exception', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({
            username: signupDto.username,
            password: signupDto.password,
            firstName: signupDto.firstName,
            lastName: signupDto.lastName,
            roleId: signupDto.roleId,
          })
          .expectStatus(400);
      });
      it('should forbidden exception', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({
            username: fakeSignupDto.username,
            password: fakeSignupDto.password,
            firstName: fakeSignupDto.firstName,
            lastName: fakeSignupDto.lastName,
            roleId: fakeSignupDto.roleId,
            contactInformation: {
              phone: fakeSignupDto.contactInformation.phone,
              email: fakeSignupDto.contactInformation.email,
            },
          })
          .expectStatus(403);
      });
      it('should signup', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({
            username: signupDto.username,
            password: signupDto.password,
            firstName: signupDto.firstName,
            lastName: signupDto.lastName,
            roleId: signupDto.roleId,
            contactInformation: {
              phone: signupDto.contactInformation.phone,
              email: signupDto.contactInformation.email,
            },
          })
          .expectStatus(201);
      });
    });
  });
});
