import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { User } from './schemas/user.schema'
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt'
import { Model } from 'mongoose';
import { AuthenticateDto } from './dto/authenticate.dto';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user-dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<User>,
        private jwtService: JwtService,
    ) { }
    async signUp(userObject: CreateUserDto): Promise<any> {

        const { username, password } = userObject;
        const existingUser = await this.userModel.findOne({ username });
        if (existingUser) {
            throw new UnauthorizedException(`User with ${username} already registered`)
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await this.userModel.create({
            username,
            password: hashedPassword,
        });
        const token = this.jwtService.sign({ id: newUser._id });
        return {
            ...newUser, token
        }
    }
    async login(userObject: AuthenticateDto): Promise<any> {
        const { username, password } = userObject;
        const existingUser = await this.userModel.findOne({ username });
        if (!existingUser) {
            throw new NotFoundException(`User with ${username} not exist`)
        }
        const isPasswordMatch = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordMatch) {
            throw new UnauthorizedException('Password is not correct');
        }
        const token = this.jwtService.sign({ id: existingUser._id });
        return {
            token,
        }
    }
}
