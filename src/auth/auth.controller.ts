import { Body, Controller, Post } from '@nestjs/common';
import { AuthenticateDto } from './dto/authenticate.dto';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user-dto';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { UserCreationReturn, UserLoginReturn } from './schemas/user.schema'
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }
    @Post('/signup')
    @ApiCreatedResponse({
        description: 'Created user object as response',
        type: UserCreationReturn,
    })
    async signup(@Body() user: CreateUserDto): Promise<any> {
        return await this.authService.signUp(user);
    }
    @Post('/login')
    @ApiCreatedResponse({
        description: 'login user object as response',
        type: UserLoginReturn,
    })
    async login(@Body() user: AuthenticateDto): Promise<any> {
        return await this.authService.login(user);
    }
}
