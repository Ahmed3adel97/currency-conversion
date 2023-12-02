import { Test, TestingModule } from '@nestjs/testing';
import { TransactionSerive } from './transcation.service';
import { Transaction } from './schemas/transaction.schema';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

let transactionService: TransactionSerive;
let model: Model<Transaction>
let axiosMock: MockAdapter;

let mockTransactionService = {
  find: jest.fn(),
  create: jest.fn(),
}
const mockUser = {
  _id: '61c0ccf11d7bf83d153d7c06',
  name: 'ahmed',
};
const transactionDto = {
  sourceCurrency: "USD",
  targetCurrency: "EGP",
  amount: 10,
}
const mockTrasaction: any = {
  _id: "65696a0b9fbca87c116a5115",
  amount: 10,
  convertedAmount: 310.547,
  sourceCurrency: "USD",
  targetCurrency: "EGP",
  user: '61c0ccf11d7bf83d153d7c06'
}

const mockedtras = [
  mockTrasaction
]
beforeEach(async () => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      TransactionSerive,
      {
        provide: getModelToken(Transaction.name),
        useValue: mockTransactionService,
      },
    ],
  }).compile();

  transactionService = module.get<TransactionSerive>(TransactionSerive);
  model = module.get<Model<Transaction>>(getModelToken(Transaction.name));
  axiosMock = new MockAdapter(axios);
});
afterEach(() => {
  axiosMock.reset();
});
describe('Get Transactions', () => {
  it('should get all transactions filtered by user Id', async () => {
    jest.spyOn(model, 'find').mockResolvedValue(mockedtras);
    const result = await transactionService.getTransactionHistory(mockUser);
    expect(result).toEqual(mockedtras);
  })
})

const axiosRes = {
  result: "success",
  documentation: "https://www.exchangerate-api.com/docs",
  terms_of_use: "https://www.exchangerate-api.com/terms",
  time_last_update_unix: 1701388802,
  time_last_update_utc: "Fri, 01 Dec 2023 00:00:02 +0000",
  time_next_update_unix: 1701475202,
  time_next_update_utc: "Sat, 02 Dec 2023 00:00:02 +0000",
  base_code: "USD",
  target_code: "EGP",
  conversion_rate: 31.0547
}
describe('create', () => {
  it('should create new transaction and convert the currency', async () => {
    axiosMock
      .onGet(`https://v6.exchangerate-api.com/v6/42a7bba9293a9adb7ab1c8c9/pair/USD/EGP`)
      .reply(200, axiosRes);
    jest
      .spyOn(model, 'create')
      .mockImplementationOnce(() => Promise.resolve(mockTrasaction))
    const result = await transactionService.convert(transactionDto, mockUser);
    expect(result).toEqual(mockTrasaction);
  });
});