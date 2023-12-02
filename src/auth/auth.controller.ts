import { Body, Controller, Post } from '@nestjs/common';
import { AuthenticateDto } from './dto/authenticate.dto';
import { Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user-dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }
    @Post('/signup')
    async signup(@Body() user: CreateUserDto): Promise<any> {
        return await this.authService.signUp(user);
    }
    @Get('/login')
    async login(@Body() user: AuthenticateDto): Promise<any> {
        return await this.authService.login(user);
    }
}
