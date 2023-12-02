import { IsString, IsNotEmpty,  } from 'class-validator';
export class AuthenticateDto {
    @IsString()
    @IsNotEmpty()
    readonly username: string;
    @IsString()
    @IsNotEmpty()
    readonly password: string;
}