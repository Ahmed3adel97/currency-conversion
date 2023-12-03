import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class TransactionDto {
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({
        description: 'amount of money that needs to tranfer to',
        example: 20,
    })
    readonly amount: number;
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'Source currency to convert amount from',
        example: 'USD',
    })
    readonly sourceCurrency: string;
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'Trarget currency to convert the amount to',
        example: 'EGP',
    })
    readonly targetCurrency: string; //TODO add enums for the values
}

export class TransactionReturn {
        @ApiProperty({
            description: 'id of the transaction',
            example: '656befd981c5249358e0d9ce',
        })
        id: string;
        @ApiProperty({
            description: 'amount of money that needs to tranfer',
            example: 20,
        })
        amount: number;
        
        @ApiProperty({
            description: 'transfered amount',
            example: 316.1,
        })
        convertedAmount: number;
        @ApiProperty({
            description: 'source currency',
            example: "USD",
        })
        sourceCurrency: string;
        @ApiProperty({
            description: 'target currency',
            example: "EGP",
        })
        targetCurrency: string;
        @ApiProperty({
            description: 'target currency',
            example: "656bef2681c5249358e0d9c8",
        })
        user: string;
        @ApiProperty({
            description: 'amount of money that needs to tranfer to',
            example: "2023-12-03T03:02:49.308Z",
        })
        createdAt: Date;
        @ApiProperty({
            description: 'amount of money that needs to tranfer to',
            example: "2023-12-03T03:02:49.308Z",
        })
        updatedAt: Date;
}