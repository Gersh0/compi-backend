import { Prop } from '@nestjs/mongoose';
import { IsEmail, IsNotEmpty, IsPositive, IsString, Matches, MaxLength, Min, MinLength } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty()
    @IsPositive()
    @Min(1)	
    id: number;

    @IsString()
    @MinLength(3)
    alias: string;

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    @MaxLength(50)
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'The password must have a Uppercase, lowercase letter and a number'
    })
    password: string;

    @IsNotEmpty()
    @IsString()
    @Prop({ required: true, enum: ['adjudicator', 'leader', 'member'] })
    rank: string;

    @IsString({ each: true })
    missions: string[];
}