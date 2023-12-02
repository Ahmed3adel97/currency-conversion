import { IsString, IsNotEmpty,  IsNumber} from 'class-validator';
export class TransactionDto {
    @IsNumber()
    @IsNotEmpty()
    readonly amount: number;
    @IsString()
    @IsNotEmpty()
    readonly sourceCurrency: string;
    @IsString()
    @IsNotEmpty()
    readonly targetCurrency: string; //TODO add enums for the values
}