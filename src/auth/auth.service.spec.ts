import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { AuthService } from './auth.service';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UnauthorizedException } from '@nestjs/common';

describe('authService', () => {
    let authService: AuthService;
    let model: Model<User>
    let jwtService: JwtService;

    const mockedUser: any = {
        _id: '65694fb57cf95011259ebfc8',
        username: 'mark'
    }
    const userObject = {
        username: 'mark',
        password: '12345678',
    };
    const mockAuthService = {
        create: jest.fn(),
        findOne: jest.fn()
    }
    const token = 'mockedToken';
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthService,
                JwtService,
                {
                    provide: getModelToken(User.name),
                    useValue: mockAuthService
                }
            ]
        }).compile()
        authService = module.get<AuthService>(AuthService);
        model = module.get<Model<User>>(getModelToken(User.name));
        jwtService = module.get<JwtService>(JwtService);
    })
    describe('sign up', () => {
        it('should create new user', async () => {
            jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashedPassword');
            jest
                .spyOn(model, 'create')
                .mockImplementationOnce(() => Promise.resolve(mockedUser));

            jest.spyOn(jwtService, 'sign').mockReturnValue(token);
            const result = await authService.signUp(userObject);

            expect(bcrypt.hash).toHaveBeenCalled();            
            expect(result).toEqual({  ...mockedUser, token });
        })
    })

    describe('login', () => {
        it('should login when passing the correct credetials', async() => {
            jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(true);
            jest.spyOn(jwtService, 'sign').mockReturnValue(token);
            jest.spyOn(model, 'findOne').mockResolvedValueOnce(mockedUser);
            const result = await authService.login(userObject);

            expect(result).toEqual({ token });
      
        })
        it('should return wrong password response', async() => {
            jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(false);
            jest.spyOn(model, 'findOne').mockResolvedValueOnce(mockedUser);

            await expect(authService.login(userObject)).rejects.toThrow(
                UnauthorizedException,
              );
        })
    })
})