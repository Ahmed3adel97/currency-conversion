import { Module } from '@nestjs/common';
import { TranscationController } from './transcation.controller';
import { TransactionSerive } from './transcation.service';
import { transactionSchema } from './schemas/transaction.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: 'Transaction', schema: transactionSchema}]),
  ],
  controllers: [TranscationController],
  providers: [TransactionSerive]
})
export class TranscationModule {}
