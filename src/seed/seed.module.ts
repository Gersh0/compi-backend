import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { MissionModule } from 'src/mission/mission.module';
import { RuleModule } from 'src/rule/rule.module';
import { PunishmentModule } from 'src/punishment/punishment.module';
import { AuthModule } from 'src/auth/auth.module';
import { CommonModule } from 'src/common/common.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService], //, AuthService, RuleService, PunishmentService, MissionService
  imports: [
    CommonModule,
    MissionModule,
    RuleModule,
    PunishmentModule,
    AuthModule
  ]
})
export class SeedModule { }