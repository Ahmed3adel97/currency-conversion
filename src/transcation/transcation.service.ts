import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios from 'axios';
import { Transaction } from './schemas/transaction.schema';
import * as  mongoose from 'mongoose';
import { TransactionDto } from './dto/transaction.dto';
import { User } from '../auth/schemas/user.schema';

@Injectable()
export class TransactionSerive {
    constructor(
        @InjectModel(Transaction.name)
        private transactionModel: mongoose.Model<Transaction>
    ) { }

    async convert(trasnsactioDto: TransactionDto, user: any): Promise<Transaction> {

        const { sourceCurrency, targetCurrency, amount } = trasnsactioDto;
        // TODO: refactor the url and move the base code to env
        const url = `https://v6.exchangerate-api.com/v6/42a7bba9293a9adb7ab1c8c9/pair/${sourceCurrency}/${targetCurrency}`;
        const res: any = await axios.get(url);
        if (res.data.result !== 'success') {
            throw new BadRequestException('Somthing went wrong');
        }

        const { conversion_rate } = res.data;
        // const conversion_rate = 1;
        const convertedAmount = amount * conversion_rate;
        const newTrasaction: any = await this.transactionModel.create({
            amount,
            sourceCurrency,
            targetCurrency,
            convertedAmount,
            user: user._id,
        })
        return newTrasaction;
    }
    async getTransactionHistory(user: any): Promise<any> {
        const userId = user._id;
        const isValidId = mongoose.isValidObjectId(userId);
        if (!isValidId) {
            throw new BadRequestException('User Id not valid');
        }
        const transactions = await this.transactionModel.find({ user: userId });
        return transactions;
    }
}