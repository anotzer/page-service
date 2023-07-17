import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '@app/app.module';
import { log } from 'util';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let metadata: any;
  let token: string;

  const userDataLogin = {
    email: 'test@email.email',
    password: 'somePass123',
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    const { body } = await request(app.getHttpServer()).post('/auth/login').send(userDataLogin);
    token = body.access_token;
  });

  it('/review/create (POST)', () => {
    return request(app.getHttpServer())
      .post('/review/create')
      .send({
        name: 'This is new name',
        title: 'This is new title',
        description: 'This is description',
        rating: 15,
      })
      .set('Authorization', `Bearer ${token}`)
      .expect(201)
      .then(({ body }: request.Response) => {
        metadata = body.id;
      });
  });

  it('/review/:id (GET)', () => {
    return request(app.getHttpServer()).get(`/review/${metadata}`).expect(200);
  });

  it('/review/:id (PUT)', () => {
    return request(app.getHttpServer())
      .put(`/review/${metadata}`)
      .send({
        name: 'This is updated name',
        title: 'This is updated title',
        description: 'This updated description',
        rating: 10,
      })
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
  });

  it('/review/:id (DELETE)', () => {
    return request(app.getHttpServer())
      .delete(`/review/${metadata}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
  });

  it('/review/:id (Get) NotFoundException after delete', () => {
    return request(app.getHttpServer()).get(`/review/${metadata}`).expect(404);
  });

  afterEach(() => {
    log(`Current ID = ${metadata}`);
  });
});
