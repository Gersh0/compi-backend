import { Module } from '@nestjs/common';
import { PunishmentService } from './punishment.service';
import { PunishmentController } from './punishment.controller';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { Punishment, PunishmentSchema } from './entities/punishment.entity';

@Module({
  controllers: [PunishmentController],
  providers: [PunishmentService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Punishment.name,
        schema: PunishmentSchema
      }
    ]),
  ],
  exports: [
    MongooseModule.forFeature([
      {
        name: Punishment.name,
        schema: PunishmentSchema
      }
    ]),
  ]
})
export class PunishmentModule { }
