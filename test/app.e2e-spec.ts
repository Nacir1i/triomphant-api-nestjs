import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as pactum from 'pactum';
import { AppModule } from '../src/app.module';
import { LoginDto, SignupDto } from '../src/auth/dto';
import { RoleDto } from 'src/roles/dto';
import { CustomerDto, PartialTypedCustomer } from 'src/customer/dto';
import { VendorDto, PartialTypedVendor } from 'src/vendor/dto';

describe('App e2e testing', () => {
  let app: INestApplication;

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

    pactum.request.setBaseUrl('http://localhost:3333');
  });

  afterAll(() => {
    app.close();
  });

  describe('Roles', () => {
    describe('POST: role/create', () => {
      const roleDto: RoleDto = {
        title: 'ADMIN',
      };
      const roleDto2: RoleDto = {
        title: 'MANAGER',
      };

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
    });

    describe('GET: role/findOne/{id}', () => {
      it('should throw bad request exception', () => {
        return pactum
          .spec()
          .get('/role/findOne/{findOne}')
          .withPathParams('findOne', 'test')
          .expectStatus(400);
      });
      it('should throw not found exception', () => {
        return pactum
          .spec()
          .get('/role/findOne/{findOne}')
          .withPathParams('findOne', 999)
          .expectStatus(404);
      });
      it('should return role object', () => {
        return pactum
          .spec()
          .get('/role/findOne/{findOne}')
          .withPathParams('findOne', 1)
          .expectStatus(200);
      });
    });

    describe('GET: role/findSearch/{search}', () => {
      it('should throw bad request exception', () => {
        return pactum
          .spec()
          .get('/role/findSearch/{findSearch}')
          .withPathParams('findSearch', 1)
          .expectStatus(400);
      });
      it('should return role object', () => {
        return pactum
          .spec()
          .get('/role/findSearch/{findSearch}')
          .withPathParams('findSearch', 'ADMIN')
          .expectStatus(200);
      });
    });

    describe('PATCH: role/update', () => {
      it('should throw bad request exception', () => {
        return pactum
          .spec()
          .patch('/role/update')
          .withBody({})
          .expectStatus(400);
      });
      it('should throw not found exception', () => {
        return pactum
          .spec()
          .patch('/role/update')
          .withQueryParams({ id: 9 })
          .withBody({ title: 'ASSISTANT' })
          .expectStatus(404);
      });
      it('should update "MANAGER" role', () => {
        return pactum
          .spec()
          .patch('/role/update')
          .withQueryParams({ id: 3 })
          .withBody({ title: 'ASSISTANT' })
          .expectStatus(200);
      });
    });

    describe('DELETE: role/delete', () => {
      it('should throw bad request exception', () => {
        return pactum.spec().delete('/role/delete').expectStatus(400);
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
  });

  describe('Authentication', () => {
    describe('POST: auth/signup', () => {
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

    describe('POST: auth/login', () => {
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

  describe('Customer', () => {
    describe('POST: agent/customer/create', () => {
      const customerDto: CustomerDto = {
        firstName: 'customer1',
        lastName: 'customer1',
        email: 'customer@email.bob',
        phone: '0666666666',
        address: 'Customer address N°47',
        honorific: 'Mister',
        emergency: false,
        name: 'Bank',
        number: 'XXXXXXXXXX',
        rib: 'XXXXXXXXXX',
        swift: 'XXXXXXXXX',
        ice: 'XXXXXXXXXXX',
      };

      it('should throw bad request exception', () => {
        return pactum
          .spec()
          .post('/agent/customer/create')
          .withBody({})
          .expectStatus(400);
      });
      it('should throw bad request exception', () => {
        return pactum
          .spec()
          .post('/agent/customer/create')
          .withBody({
            firstName: customerDto.firstName,
            lastName: customerDto.lastName,
          })
          .expectStatus(400);
      });
      it('should create a customer', () => {
        return pactum
          .spec()
          .post('/agent/customer/create')
          .withBody(customerDto)
          .expectStatus(201);
      });
      it('should create a customer', () => {
        return pactum
          .spec()
          .post('/agent/customer/create')
          .withBody(customerDto)
          .expectStatus(201);
      });
    });

    describe('GET: agent/customer/findOne/{id}', () => {
      it('should throw bad request exception', () => {
        return pactum
          .spec()
          .get('/agent/customer/findOne/{findOne}')
          .expectStatus(400);
      });
      it('should throw bad request exception', () => {
        return pactum
          .spec()
          .get('/agent/customer/findOne/{findOne}')
          .withPathParams('findOne', 'test')
          .expectStatus(400);
      });
      it('should throw not found exception-', () => {
        return pactum
          .spec()
          .get('/agent/customer/findOne/{findOne}')
          .withPathParams('findOne', 69)
          .expectStatus(404);
      });
      it('should return customer object', () => {
        return pactum
          .spec()
          .get('/agent/customer/findOne/{findOne}')
          .withPathParams('findOne', 1)
          .expectStatus(200);
      });
    });

    describe('GET: agent/customer/findSearch/{search}', () => {
      it('should throw bad request exception', () => {
        return pactum
          .spec()
          .get('/agent/customer/findSearch/{findSearch}')
          .withPathParams('findSearch', 88)
          .expectStatus(400);
      });
      it('should return array of customers', () => {
        return pactum
          .spec()
          .get('/agent/customer/findSearch/{findSearch}')
          .withPathParams('findSearch', 'customer')
          .expectStatus(200);
      });
    });

    describe('GET: agent/customer/getPage?page=X&limit=X', () => {
      it('should throw bad request exception', () => {
        return pactum
          .spec()
          .get('/agent/customer/getPage')
          .withQueryParams({
            page: 1,
          })
          .expectStatus(400);
      });
      it('should throw bad request exception', () => {
        return pactum
          .spec()
          .get('/agent/customer/getPage')
          .withQueryParams({
            limit: 10,
          })
          .expectStatus(400);
      });
      it('should return array of customers', () => {
        return pactum
          .spec()
          .get('/agent/customer/getPage')
          .withQueryParams({
            page: 1,
            limit: 10,
          })
          .expectStatus(200);
      });
    });

    describe('PATCH: agent/customer/update/{id}', () => {
      const customerDto: PartialTypedCustomer = {
        id: 1,
        firstName: 'updatedCustomer',
        lastName: 'updatedCustomer',
        email: 'customer@email.bob',
        phone: '0666666666',
        address: 'Customer address N°47',
        honorific: 'Mister',
        emergency: false,
        name: 'Bank',
        number: 'XXXXXXXXXX',
        rib: 'XXXXXXXXXX',
        swift: 'XXXXXXXXX',
        ice: 'XXXXXXXXXXX',
      };

      it('should throw bad request exception', () => {
        return pactum
          .spec()
          .patch('/agent/customer/update')
          .withBody(customerDto)
          .expectStatus(400);
      });

      it('should not found exception', () => {
        return pactum
          .spec()
          .patch('/agent/customer/update')
          .withQueryParams({ id: 999 })
          .withBody(customerDto)
          .expectStatus(404);
      });

      it('should update customers', () => {
        return pactum
          .spec()
          .patch('/agent/customer/update')
          .withQueryParams({ id: 1 })
          .withBody(customerDto)
          .expectStatus(200);
      });
    });

    describe('DELETE: agent/customer/delete/{id}', () => {
      it('should throw a bad  request exception', () => {
        return pactum
          .spec()
          .delete('/agent/customer/delete/{id}')
          .expectStatus(400);
      });
      it('should throw bad exception', () => {
        return pactum
          .spec()
          .delete('/agent/customer/delete/{id}')
          .withPathParams('id', 'test')
          .expectStatus(400);
      });
      it('should throw not found exception', () => {
        return pactum
          .spec()
          .delete('/agent/customer/delete/{id}')
          .withPathParams('id', 99)
          .expectStatus(404);
      });
      it('should delete a customer', () => {
        return pactum
          .spec()
          .delete('/agent/customer/delete/{id}')
          .withPathParams('id', 1)
          .expectStatus(200);
      });
    });
  });

  describe('Vendor', () => {
    describe('POST: agent/vendor/create', () => {
      const vendor1: VendorDto = {
        firstName: 'vendor1',
        lastName: 'vendor1',
        companyName: 'Company',
        email: 'vendor@email.bob',
        phone: '0666666666',
        address: 'Customer address N°47',
        honorific: 'Mister',
        emergency: false,
        name: 'Bank',
        number: 'XXXXXXXXXX',
        rib: 'XXXXXXXXXX',
        swift: 'XXXXXXXXX',
        ice: 'XXXXXXXXXXX',
      };
      const vendor2: VendorDto = {
        firstName: 'vendor2',
        lastName: 'vendor2',
        companyName: 'Company',
        email: 'vendor@email.bob',
        phone: '0666666666',
        address: 'Customer address N°47',
        honorific: 'Mister',
        emergency: false,
        name: 'Bank',
        number: 'XXXXXXXXXX',
        rib: 'XXXXXXXXXX',
        swift: 'XXXXXXXXX',
        ice: 'XXXXXXXXXXX',
      };

      it('should bad request exception', () => {
        return pactum.spec().post('/agent/vendor/create').expectStatus(400);
      });
      it('should bad request exception', () => {
        return pactum
          .spec()
          .post('/agent/vendor/create')
          .withBody({})
          .expectStatus(400);
      });
      it('should bad request exception', () => {
        return pactum
          .spec()
          .post('/agent/vendor/create')
          .withBody({
            firstName: 'test',
            lastName: 'test',
          })
          .expectStatus(400);
      });
      it('should create first vendor', () => {
        return pactum
          .spec()
          .post('/agent/vendor/create')
          .withBody(vendor1)
          .expectStatus(201);
      });
      it('should create second vendor', () => {
        return pactum
          .spec()
          .post('/agent/vendor/create')
          .withBody(vendor2)
          .expectStatus(201);
      });
    });

    describe('GET: agent/vendor/findOne/{id}', () => {
      it('should bad request exception', () => {
        return pactum
          .spec()
          .get('/agent/vendor/findOne/{findOne}')
          .expectStatus(400);
      });
      it('should bad request exception', () => {
        return pactum
          .spec()
          .get('/agent/vendor/findOne/{findOne}')
          .withPathParams('findOne', 'test')
          .expectStatus(400);
      });
      it('should not found exception', () => {
        return pactum
          .spec()
          .get('/agent/vendor/findOne/{findOne}')
          .withPathParams('findOne', 99)
          .expectStatus(404);
      });
      it('should return vendor object', () => {
        return pactum
          .spec()
          .get('/agent/vendor/findOne/{findOne}')
          .withPathParams('findOne', 1)
          .expectStatus(200);
      });
    });

    describe('GET: agent/vendor/findSearch/{search}', () => {
      it('should bad request exception', () => {
        return pactum
          .spec()
          .get('/agent/vendor/findSearch/{findSearch}')
          .expectStatus(400);
      });
      it('should bad request exception', () => {
        return pactum
          .spec()
          .get('/agent/vendor/findSearch/{findSearch}')
          .withPathParams('findSearch', 1)
          .expectStatus(400);
      });
      it('should return vendor array', () => {
        return pactum
          .spec()
          .get('/agent/vendor/findSearch/{findSearch}')
          .withPathParams('findSearch', 'vendor')
          .expectStatus(200);
      });
    });

    describe('GET: agent/vendor/getPage?page=X&limit=X', () => {
      it('should bad request exception', () => {
        return pactum.spec().get('/agent/vendor/getPage').expectStatus(400);
      });
      it('should bad request exception', () => {
        return pactum
          .spec()
          .get('/agent/vendor/getPage')
          .withQueryParams({
            page: 1,
          })
          .expectStatus(400);
      });
      it('should bad request exception', () => {
        return pactum
          .spec()
          .get('/agent/vendor/getPage')
          .withQueryParams({
            limit: 10,
          })
          .expectStatus(400);
      });
      it('should return vendor array', () => {
        return pactum
          .spec()
          .get('/agent/vendor/getPage')
          .withQueryParams({
            page: 1,
            limit: 10,
          })
          .expectStatus(200);
      });
    });

    describe('PATCH: agent/vendor/update/{id}', () => {
      const vendor: PartialTypedVendor = {
        firstName: 'updatedVendor',
        lastName: 'updatedVendor',
        companyName: 'Company',
        email: 'vendor@email.bob',
        phone: '0666666666',
        address: 'Customer address N°47',
        honorific: 'Mister',
        emergency: false,
        name: 'Bank',
        number: 'XXXXXXXXXX',
        rib: 'XXXXXXXXXX',
        swift: 'XXXXXXXXX',
        ice: 'XXXXXXXXXXX',
      };

      it('should bad request exception', () => {
        return pactum
          .spec()
          .patch('/agent/vendor/update/{id}')
          .withBody(vendor)
          .expectStatus(400);
      });
      it('should bad request exception', () => {
        return pactum
          .spec()
          .patch('/agent/vendor/update/{id}')
          .withPathParams('id', 'test')
          .expectStatus(400);
      });
      it('should not found exception', () => {
        return pactum
          .spec()
          .patch('/agent/vendor/update/{id}')
          .withPathParams('id', 99)
          .withBody(vendor)
          .expectStatus(404);
      });
      it('should update vendor', () => {
        return pactum
          .spec()
          .patch('/agent/vendor/update/{id}')
          .withPathParams('id', 1)
          .withBody(vendor)
          .expectStatus(200);
      });
    });

    describe('DELETE: agent/vendor/delete/{id}', () => {
      it('should throw bad request exception', () => {
        return pactum
          .spec()
          .delete('/agent/vendor/delete/{id}')
          .expectStatus(400);
      });
      it('should throw bad request exception', () => {
        return pactum
          .spec()
          .delete('/agent/vendor/delete/{id}')
          .withPathParams('id', 'test')
          .expectStatus(400);
      });
      it('should throw not found exception', () => {
        return pactum
          .spec()
          .delete('/agent/vendor/delete/{id}')
          .withPathParams('id', 99)
          .expectStatus(404);
      });
      it('should delete vendor', () => {
        return pactum
          .spec()
          .delete('/agent/vendor/delete/{id}')
          .withPathParams('id', 2)
          .expectStatus(200);
      });
    });
  });

  describe('Employee', () => {
    describe('GET: agent/employee/findOne', () => {
      it('should throw bad request exception (field type error)', () => {
        return pactum
          .spec()
          .get('/agent/employee/findOne/{findOne}')
          .withPathParams('findOne', 'test')
          .expectStatus(400);
      });
      it('should throw bad request exception (missing id)', () => {
        return pactum
          .spec()
          .get('/agent/employee/findOne/{findOne}')
          .expectStatus(400);
      });
      it('should throw not found exception', () => {
        return pactum
          .spec()
          .get('/agent/employee/findOne/{findOne}')
          .withPathParams('findOne', 99)
          .expectStatus(404);
      });
      it('should return employee object', () => {
        return pactum
          .spec()
          .get('/agent/employee/findOne/{findOne}')
          .withPathParams('findOne', 1)
          .expectStatus(200);
      });
    });

    describe('GET: agent/employee/findSearch', () => {
      it('should throw bad request exception (missing search)', () => {
        return pactum
          .spec()
          .get('/agent/employee/findSearch/{findSearch}')
          .expectStatus(400);
      });
      it('should throw bad request exception (search type error)', () => {
        return pactum
          .spec()
          .get('/agent/employee/findSearch/{findSearch}')
          .withPathParams('findSearch', 'test')
          .expectStatus(400);
      });
      it('should return array of employees objects', () => {
        return pactum
          .spec()
          .get('/agent/employee/findSearch/{findSearch}')
          .withPathParams('findSearch', 'admin')
          .expectStatus(200);
      });
    });

    describe('GET: agent/employee/getPage?page=X&limit=X', () => {
      it('should throw bad request exception', () => {
        return pactum
          .spec()
          .get('/agent/employee/getPage')
          .withQueryParams({
            page: 1,
          })
          .expectStatus(400);
      });
      it('should throw bad request exception', () => {
        return pactum
          .spec()
          .get('/agent/employee/getPage')
          .withQueryParams({
            limit: 10,
          })
          .expectStatus(400);
      });
      it('should return array of employees', () => {
        return pactum
          .spec()
          .get('/agent/employee/getPage')
          .withQueryParams({
            page: 1,
            limit: 10,
          })
          .expectStatus(200);
      });
    });

    describe('PATCH: agent/employee/update/{id}', () => {
      const signupDto: SignupDto = {
        username: 'admin',
        password: 'admin',
        firstName: 'Updated',
        lastName: 'Updated',
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
        return pactum.spec().patch('/agent/employee/update').expectStatus(400);
      });
      it('should throw bad request exception', () => {
        return pactum
          .spec()
          .patch('/agent/employee/update')
          .withQueryParams({ id: 1 })
          .expectStatus(400);
      });
      it('should throw bad request exception', () => {
        return pactum
          .spec()
          .patch('/agent/employee/update')
          .withBody(signupDto)
          .expectStatus(400);
      });
      it('should not found exception', () => {
        return pactum
          .spec()
          .patch('/agent/employee/update')
          .withQueryParams({ id: 999 })
          .withBody(signupDto)
          .expectStatus(404);
      });
      it('should update employee', () => {
        return pactum
          .spec()
          .patch('/agent/employee/update')
          .withQueryParams({ id: 1 })
          .withBody(signupDto)
          .expectStatus(200);
      });
    });

    describe('DELETE: agent/employee/delete/{id}', () => {
      it('should throw a bad  request exception', () => {
        return pactum
          .spec()
          .delete('/agent/employee/delete/{id}')
          .expectStatus(400);
      });
      it('should throw bad exception', () => {
        return pactum
          .spec()
          .delete('/agent/employee/delete/{id}')
          .withPathParams('id', 'test')
          .expectStatus(400);
      });
      it('should throw not found exception', () => {
        return pactum
          .spec()
          .delete('/agent/employee/delete/{id}')
          .withPathParams('id', 99)
          .expectStatus(404);
      });
      it('should delete a employee', () => {
        return pactum
          .spec()
          .delete('/agent/employee/delete/{id}')
          .withPathParams('id', 1)
          .expectStatus(200);
      });
    });
  });
});
