import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import {  HttpStatus, INestApplication } from '@nestjs/common';

import { AppModule } from '../../../../app.module';
import { SignUpDto } from '../../../auth/app/dto/sign-up.dto';
import { LoginDto } from '../../app/dto/login.dto';

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
    it('Should be register an user (201)', async () => {
      const userRegister: SignUpDto = {
        name: 'TEST_NAME',
        lastName: 'TEST_LASTNAME',
        email: 'TEST@email.com',
        password: 'TEST_PASSWORD',
      };

      const res = await request(app.getHttpServer())
        .post('/auth/signup')
        .send(userRegister)
        expect(res.statusCode).toEqual(201)
    });

    it('Should be login user', async ()=>{
      const userLogin: LoginDto = {
        email:'TEST@email.com',
        password:'TEST_PASSWORD'
      }
      const res = await request(app.getHttpServer())
      .post('/auth/login')
      .send(userLogin)
      expect(res.body.accessToken).toBeDefined()
      expect(res.body.user).toBeDefined()
    })

    it('should be throw error "conflict: user already exist" (409)', async () => {
      const userRegister:SignUpDto = {
        name: 'TEST_NAME',
        lastName: 'TEST_LASTNAME',
        email: 'TEST@email.com',
        password: 'TEST_PASSWORD',
      };
  
      await request(app.getHttpServer())
        .post('/auth/signup')
        .send(userRegister)
        .expect(HttpStatus.CONFLICT);
    });
    it('Should be unauthorized try login with false email (401)', async () => {
      const userLogin: LoginDto = {
        email: 'TEST_false@email.com',
        password: 'TEST_PASSWORD',
      };
  
      await request(app.getHttpServer())
        .post('/auth/login')
        .send(userLogin)
        .expect(HttpStatus.UNAUTHORIZED);
    });
  
    it('Should be unauthorized try login with false password (401)', async () => {
      const userLogin: LoginDto = {
        email: 'TEST@email.com',
        password: 'TEST_PASSWORD_FALSE',
      };
  
      await request(app.getHttpServer())
        .post('/auth/login')
        .send(userLogin)
        .expect(HttpStatus.UNAUTHORIZED);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
