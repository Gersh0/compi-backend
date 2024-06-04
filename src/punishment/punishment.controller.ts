import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PunishmentService } from './punishment.service';
import { CreatePunishmentDto } from './dto/create-punishment.dto';
import { UpdatePunishmentDto } from './dto/update-punishment.dto';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id.pipe';

@Controller('punishment')
export class PunishmentController {
  constructor(private readonly punishmentService: PunishmentService) { }

  @Post()
  create(@Body() createPunishmentDto: CreatePunishmentDto) {
    return this.punishmentService.create(createPunishmentDto);
  }

  @Get()
  findAll() {
    return this.punishmentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.punishmentService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePunishmentDto: UpdatePunishmentDto) {
    return this.punishmentService.update(id, updatePunishmentDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseMongoIdPipe) id: string) {
    return this.punishmentService.remove(id);
  }
}
