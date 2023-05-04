import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as pactum from 'pactum';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import { LoginDto, SignupDto } from '../src/auth/dto';
import { PartialTypedRoleDto, RoleDto } from 'src/roles/dto';

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

  describe('Roles', () => {
    const roleDto: PartialTypedRoleDto = {
      id: 1,
      title: 'ADMIN',
    };
    const roleDto2: PartialTypedRoleDto = {
      id: 2,
      title: 'MANAGER',
    };

    // create tests :
    it('should throw bad request exception', () => {
      return pactum
        .spec()
        .post('/role/create')
        .withBody({ title: '' })
        .expectStatus(400);
    });
    it('should create role', () => {
      return pactum
        .spec()
        .post('/role/create')
        .withBody(roleDto)
        .expectStatus(201);
    });
    it('forbidden exception', () => {
      return pactum
        .spec()
        .post('/role/create')
        .withBody(roleDto)
        .expectStatus(403);
    });
    it('should create role', () => {
      return pactum
        .spec()
        .post('/role/create')
        .withBody(roleDto2)
        .expectStatus(201);
    });

    // find one tests :
    it('should throw bad request exception', () => {
      return pactum.spec().post('/role/finOne').withBody({}).expectStatus(400);
    });
    it('should throw bad request exception', () => {
      return pactum
        .spec()
        .post('/role/finOne')
        .withBody({ id: '1' })
        .expectStatus(400);
    });
    it('should throw not found exception', () => {
      return pactum
        .spec()
        .post('/role/finOne')
        .withBody({ title: 'fake' })
        .expectStatus(404);
    });
    it('should return role object', () => {
      return pactum
        .spec()
        .post('/role/finOne')
        .withBody({ title: roleDto.title })
        .expectStatus(200);
    });

    // find all tests :
    it('should return array of role objects', () => {
      return pactum.spec().get('/role/finAll').expectStatus(200);
    });

    // update tests :
    it('should throw bad request exception', () => {
      return pactum
        .spec()
        .post('/role/update')
        .withQueryParams({ id: 2 })
        .withBody({})
        .expectStatus(400);
    });
    it('should throw bad request exception', () => {
      return pactum
        .spec()
        .post('/role/update')
        .withQueryParams({})
        .withBody({})
        .expectStatus(400);
    });
    it('should throw not found exception', () => {
      return pactum
        .spec()
        .post('/role/update')
        .withQueryParams({ id: 9 })
        .withBody({ title: 'ASSISTANT' })
        .expectStatus(404);
    });
    it('should update "MANAGER" role', () => {
      return pactum
        .spec()
        .post('/role/update')
        .withQueryParams({ id: 2 })
        .withBody({ title: 'ASSISTANT' })
        .expectStatus(200);
    });

    // delete tests :
    it('should throw bad request exception', () => {
      return pactum
        .spec()
        .delete('/role/delete')
        .withQueryParams({})
        .expectStatus(400);
    });
    it('should throw not found exception', () => {
      return pactum
        .spec()
        .delete('/role/delete')
        .withQueryParams({ id: 9 })
        .expectStatus(404);
    });
    it('should soft delete role admin', () => {
      return pactum
        .spec()
        .delete('/role/delete')
        .withQueryParams({ id: 1 })
        .expectStatus(200);
    });
  });

  describe('Authentication', () => {
    describe('signup', () => {
      const signupDto: SignupDto = {
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
      it('should forbidden exception', () => {
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
          .expectStatus(403);
      });
    });

    describe('login', () => {
      const loginDto: LoginDto = {
        username: 'admin',
        password: 'admin',
      };
      const fakeLoginDto: LoginDto = {
        username: 'fake',
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
