import { Body, Controller, UseGuards, Post, Req, Get } from '@nestjs/common';
import { TransactionSerive } from './transcation.service';
import { TransactionDto } from './dto/transaction.dto';
import { AuthGuard } from '@nestjs/passport';
@Controller('')
export class TranscationController {
    constructor(private transactionSerive: TransactionSerive) { }
    @Post('/convert')
    @UseGuards(AuthGuard())
    async convert(@Body() trasnsactioDto: TransactionDto, @Req() req): Promise<any> {
        return await this.transactionSerive.convert(trasnsactioDto, req.user);
    }
    @Get('/history')
    @UseGuards(AuthGuard())
    async getHistory(@Req() req): Promise<any> {
        return await this.transactionSerive.getTransactionHistory(req.user);
    }
}
