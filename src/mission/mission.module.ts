import { Module } from '@nestjs/common';
import { MissionService } from './mission.service';
import { MissionController } from './mission.controller';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { Mission, MissionSchema } from './entities/mission.entity';

@Module({
  controllers: [MissionController],
  providers: [MissionService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Mission.name,
        schema: MissionSchema
      }
    ]),
  ],
  exports: [
    MongooseModule.forFeature([
      {
        name: Mission.name,
        schema: MissionSchema
      }
    ]),
  ]
})
export class MissionModule { }
