import { PartialType } from '@nestjs/mapped-types';
import { CreatePunishmentDto } from './create-punishment.dto';

export class UpdatePunishmentDto extends PartialType(CreatePunishmentDto) {}
