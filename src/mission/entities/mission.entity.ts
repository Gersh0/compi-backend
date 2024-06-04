import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Mission extends Document {
    @Prop({ unique: true, index: true })
    id: number;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    description: string;

    @Prop({ required: false, type: [Number] })
    members?: number[];
}

export const MissionSchema = SchemaFactory.createForClass(Mission);