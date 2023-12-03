import { Body, Controller, UseGuards, Post, Req, Get } from '@nestjs/common';
import { TransactionSerive } from './transcation.service';
import { TransactionDto, TransactionReturn } from './dto/transaction.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiCreatedResponse } from '@nestjs/swagger';
@Controller('')
export class TranscationController {
    constructor(private transactionSerive: TransactionSerive) { }

    @ApiBearerAuth()
    @Post('/convert')
    @ApiCreatedResponse({
        description: 'Created user object as response',
        type: TransactionReturn,
    })
    @UseGuards(AuthGuard())
    async convert(@Body() trasnsactioDto: TransactionDto, @Req() req): Promise<any> {
        return await this.transactionSerive.convert(trasnsactioDto, req.user);
    }
    @ApiBearerAuth()
    @Get('/history')
    @ApiCreatedResponse({
        description: 'Created user object as response',
        type: [TransactionReturn],
    })
    @UseGuards(AuthGuard())
    async getHistory(@Req() req): Promise<any> {
        return await this.transactionSerive.getTransactionHistory(req.user);
    }
}
