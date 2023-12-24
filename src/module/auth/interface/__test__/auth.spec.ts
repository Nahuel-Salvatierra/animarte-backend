import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import {  HttpStatus, INestApplication } from '@nestjs/common';

import { AppModule } from '../../../../app.module';
import { SignUpDto } from '../../../auth/app/dto/sign-up.dto';

describe('AuthController', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();

    await app.init();
  });
  describe('POST /auth', () => {
    it('should be register an user (201)', async () => {
      const userRegister: SignUpDto = {
        name: 'TEST_NAME',
        lastName: 'TEST_LASTNAME',
        email: 'TEST@email.com',
        password: 'TEST_PASSWORD',
      };

      await request(app.getHttpServer())
        .post('/auth/signup')
        .send(userRegister)
        .expect(HttpStatus.CREATED);
    });

  });

  afterAll(async () => {
    await app.close();
  });
});
