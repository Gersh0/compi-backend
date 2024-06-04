import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { IsNotEmpty } from "class-validator";
import { Document } from 'mongoose';

@Schema()
export class Rule extends Document {
    @Prop({
        unique: true,
        index: true
    })
    id: number;

    @Prop({
        required: true,
        index: true
    })
    name: string;

    @IsNotEmpty()
    @Prop({
        required: true
    })
    description: string;

    @Prop({
        required: true
    })
    leader: number;
}

export const RuleSchema = SchemaFactory.createForClass(Rule);
