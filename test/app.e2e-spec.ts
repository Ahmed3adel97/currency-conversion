import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { User } from '../src/auth/schemas/user.schema';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';

const mockedUser = {
  username: 'testinguser',
  password: '1234567'
}
const mockedTransaction = {
  amount: 20,
  sourceCurrency: 'USD',
  targetCurrency: 'EGP',
}
let mockedToken = '';
describe('Api e2e test', () => {
  let app: INestApplication;
  let model: Model<User>

  beforeEach(async () => {
    jest.clearAllMocks();
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    model = moduleFixture.get<Model<User>>(getModelToken(User.name));
    // mockedToken = ''
  });
  afterEach(async () => {
    jest.clearAllMocks();
    await app.close();

  });
  it('/auth/signup', async () => {
    await model.deleteOne({ username: mockedUser.username })

    return request(app.getHttpServer())
      .post('/auth/signup')
      .send(mockedUser)
      .expect(201)
      .then((res) => {
        expect(res.body.token).toBeDefined();
        expect(res.body.user.username).toBe(mockedUser.username)
      })
  });
  it('/auth/login', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send(mockedUser)
      .expect(201)
      .then((res) => {
        mockedToken = res.body.token
        console.log(mockedToken);

        expect(res.body.token).toBeDefined();
      })
  });
  it('/convert', () => {
    console.log(mockedToken);

    return request(app.getHttpServer())
      .post('/convert')
      .set('Authorization', `Bearer ${mockedToken}`)
      .send(mockedTransaction)
      .expect(201)
      .then((res) => {
        expect(res.body.amount).toBe(mockedTransaction.amount)
        expect(res.body.convertedAmount).toBe(620.75)
        expect(res.body.targetCurrency).toBe(mockedTransaction.targetCurrency)
        expect(res.body.sourceCurrency).toBe(mockedTransaction.sourceCurrency)
      })
  })
  it('/history', () => {
    return request(app.getHttpServer())
      .get('/history')
      .set('Authorization', `Bearer ${mockedToken}`)
      .expect(200)
      .then((res) => {
        console.log(res.body);
        expect(res.body[0].amount).toBe(mockedTransaction.amount)
        expect(res.body[0].amount).toBe(mockedTransaction.amount)
        expect(res.body[0].convertedAmount).toBe(620.75)
        expect(res.body[0].targetCurrency).toBe(mockedTransaction.targetCurrency)
        expect(res.body[0].sourceCurrency).toBe(mockedTransaction.sourceCurrency)
      })
  })
});
