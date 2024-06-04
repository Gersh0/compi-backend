import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

@Schema()
export class Punishment extends Document {

    @Prop({ unique: true, index: true })
    id: number;

    @Prop({ required: true })
    description: string;

    @Prop({ required: true })
    cause: string;

}

export const PunishmentSchema = SchemaFactory.createForClass(Punishment);
