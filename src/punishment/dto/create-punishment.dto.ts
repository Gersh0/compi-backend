import { IsInt, IsNotEmpty, IsPositive, IsString, Min } from "class-validator";

export class CreatePunishmentDto {
    @IsNotEmpty()
    @IsInt()
    @IsPositive()
    @Min(1)
    id: number;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsString()
    cause: string;
}
