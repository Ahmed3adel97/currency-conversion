import { Body, Controller, UseGuards, Post, Req, Get } from '@nestjs/common';
import { TransactionSerive } from './transcation.service';
import { TransactionDto } from './dto/transaction.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
@Controller('')
export class TranscationController {
    constructor(private transactionSerive: TransactionSerive) { }

    @ApiBearerAuth()
    @Post('/convert')
    @UseGuards(AuthGuard())
    async convert(@Body() trasnsactioDto: TransactionDto, @Req() req): Promise<any> {
        return await this.transactionSerive.convert(trasnsactioDto, req.user);
    }
    @ApiBearerAuth()
    @Get('/history')
    @UseGuards(AuthGuard())
    async getHistory(@Req() req): Promise<any> {
        return await this.transactionSerive.getTransactionHistory(req.user);
    }
}
