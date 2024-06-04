import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
    @Prop({
        unique: true,
        index: true
    })
    id: number;

    @Prop({
        required: true,
        index: true
    })
    alias: string;

    @Prop({
        required: true,
        unique: true
    })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({
        required: true,
        enum: [
            'adjudicator',
            'leader',
            'member'
        ]
    })
    rank: string;

    @Prop({
        required: true,
        type: [String]
    })
    missions: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);


UserSchema.pre('save', function (next) {
    if (this.isModified('email')) {
        this.email = this.email.toLowerCase();
    }
    next();
});

UserSchema.pre('findOneAndUpdate', function (next) {
    const update = this.getUpdate() as { email: string };
    if (update.email) {
        update.email = update.email.toLowerCase();
    }
    next();
});
