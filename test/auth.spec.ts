import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';

import { AppModule } from './../src/app.module';

describe('Auth Controller', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleRef.createNestApplication();

    await app.init();
  });

  describe('/POST', () => {
    it(`/POST Auth`, async () => {
      const newUser = {
        name: 'TEST',
        lastName: 'TEST',
        password: 'password',
        email: 'TEST@email.com',
      };
      const res = await request(app.getHttpServer()).post('/auth/signup').send(newUser);
      console.log(res)
      expect(res.status).toEqual(201)
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
