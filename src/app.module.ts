import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MissionModule } from './mission/mission.module';
import { RuleModule } from './rule/rule.module';
import { PunishmentModule } from './punishment/punishment.module';
import { SeedModule } from './seed/seed.module';
import { ConfigModule } from '@nestjs/config';
import { EnvConfiguration } from './config/app.config';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      load: [EnvConfiguration]
    }
    ),
    MongooseModule.forRoot(EnvConfiguration().mongodb),
    MissionModule,
    RuleModule,
    PunishmentModule,
    SeedModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
