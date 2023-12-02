import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
@Schema({
    timestamps: true,
})
export class User {
    @Prop()
    username: string;
    @Prop()
    password: string;
}
export class UserResponse {
    username: string;
    password: string;
    createdAt: string;
    updatedAt: string;
    _id: string
}
export class UserCreationReturn {
    @ApiProperty({ description: 'username', example: 'jwtToken' })
    token: string;
    @ApiProperty({ description: 'username', example: {
        username: 'JhonDoee',
        password: 'hashedpassword',
        createdAt: '2023-12-02T16:31:40.818Z',
        updatedAt: '2023-12-02T17:31:40.818Z',
        _id: '656b5becd0d69bb289f08a89'
    } })
    user: UserResponse;
}
export class UserLoginReturn {
    @ApiProperty({ description: 'username', example: 'jwtToken' })
    token: string
}
export const userSchema = SchemaFactory.createForClass(User);