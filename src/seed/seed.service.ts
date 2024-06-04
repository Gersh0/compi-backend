import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from 'src/auth/entities/user.entity';
import { Mission } from 'src/mission/entities/mission.entity';
import { Punishment } from 'src/punishment/entities/punishment.entity';
import { Rule } from 'src/rule/entities/rule.entity';
import { USERS_SEED } from './data/users.seed';
import { MISSIONS_SEED } from './data/missions.seed';
import { PUNISHMENT_SEED } from './data/punishments.seed';
import { RULE_SEED } from './data/rules.seed';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class SeedService {
  constructor(

    @InjectModel(User.name)
    private readonly userModel: Model<User>,

    @InjectModel(Mission.name)
    private readonly missionModel: Model<Mission>,

    @InjectModel(Punishment.name)
    private readonly punishmentModel: Model<Punishment>,

    @InjectModel(Rule.name)
    private readonly ruleModel: Model<Rule>

  ) { }

  async executeSeed() {

    await this.userModel.deleteMany({});
    await this.missionModel.deleteMany({});
    await this.punishmentModel.deleteMany({});
    await this.ruleModel.deleteMany({});

    const userToInsert: {
      id: number,
      email: string,
      password: string,
      alias: string,
      rank: string,
      missions: string[]
    }[] = [];

    const missionToInsert: {
      id: number,
      name: string,
      description: string,
      members: number[]
    }[] = [];

    const punishmentToInsert: {
      id: number,
      description: string,
      cause: string
    }[] = [];

    const ruleToInsert: {
      id: number,
      name: string,
      description: string,
      leader: number
    }[] = [];

    USERS_SEED.forEach(user => {
      userToInsert.push(user);
    });

    MISSIONS_SEED.forEach(mission => {
      missionToInsert.push(mission);
    });

    PUNISHMENT_SEED.forEach(punishment => {
      punishmentToInsert.push(punishment);
    });

    RULE_SEED.forEach(rule => {
      ruleToInsert.push(rule);
    });

    this.userModel.insertMany(userToInsert);
    this.missionModel.insertMany(missionToInsert);
    this.punishmentModel.insertMany(punishmentToInsert);
    this.ruleModel.insertMany(ruleToInsert);

    return { message: 'Seed executed' };
  }

}
//también queda pendiente crear todo el logueo de la aplicación