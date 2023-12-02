import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateUserDto {
    @ApiProperty({
        description: 'username',
        example: 'JhonDoe',
      })
    @IsString()
    @IsNotEmpty()
    readonly username: string;
    @ApiProperty({
        description: 'password',
        example: '123456',
      })
    @IsString()
    @IsNotEmpty()
    readonly password: string
}