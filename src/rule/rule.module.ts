import { Module } from '@nestjs/common';
import { RuleService } from './rule.service';
import { RuleController } from './rule.controller';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { Rule, RuleSchema } from './entities/rule.entity';

@Module({
  controllers: [RuleController],
  providers: [RuleService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Rule.name,
        schema: RuleSchema
      }
    ]),
  ],
  exports: [
    MongooseModule.forFeature([
      {
        name: Rule.name,
        schema: RuleSchema
      }
    ]),
  ]
})
export class RuleModule { }
