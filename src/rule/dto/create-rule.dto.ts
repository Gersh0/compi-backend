import { IsMongoId, IsNotEmpty, IsPositive, IsString, MaxLength, Min, MinLength } from "class-validator";

export class CreateRuleDto {

    @IsNotEmpty()
    @IsPositive()
    @Min(1)
    id: number;

    @IsString()
    @MinLength(3)
    name: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    @MaxLength(50)
    description: string;

    @IsNotEmpty()
    @IsMongoId()
    leader: string;

}
