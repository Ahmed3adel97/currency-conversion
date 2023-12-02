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