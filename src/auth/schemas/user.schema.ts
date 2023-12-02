import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({
    timestamps: true,
})
export class User {
    @Prop()
    username: string;
    @Prop()
    password: string;
}

export const userSchema = SchemaFactory.createForClass(User);