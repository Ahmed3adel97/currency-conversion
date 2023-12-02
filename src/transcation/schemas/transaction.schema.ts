import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { User } from "../../auth/schemas/user.schema";
import mongoose from "mongoose";


@Schema({
    timestamps: true,
})
export class Transaction {
    @Prop()
    amount: number;
    @Prop()
    convertedAmount: number;
    @Prop()
    sourceCurrency: string;
    @Prop()
    targetCurrency: string;
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: User;
}
export const transactionSchema = SchemaFactory.createForClass(Transaction);