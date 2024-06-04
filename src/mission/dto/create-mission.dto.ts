import { IsInt, IsNotEmpty, IsPositive, IsString, Min, MinLength, isString } from "class-validator";

export class CreateMissionDto {
    @IsNotEmpty()
    @IsInt()
    @IsPositive()
    @Min(1)
    id: number;

    @IsString()
    @MinLength(3)
    name: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString({ each: true })
    members?: number[];
}
