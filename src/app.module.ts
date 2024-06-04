import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MissionModule } from './mission/mission.module';
import { RuleModule } from './rule/rule.module';
import { PunishmentModule } from './punishment/punishment.module';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forRoot('mongodb+srv://germinatorcofee:7N1mwTYn6qVnb0MG@wwwmypcdb.usm4lic.mongodb.net/highTable'),
    MissionModule,
    RuleModule,
    PunishmentModule,
    SeedModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
