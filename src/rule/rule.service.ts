import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateRuleDto } from './dto/create-rule.dto';
import { UpdateRuleDto } from './dto/update-rule.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Rule } from './entities/rule.entity';
import { Model, Types, isValidObjectId } from 'mongoose';

@Injectable()
export class RuleService {
  constructor(
    @InjectModel(Rule.name)
    private ruleModel: Model<Rule>
  ) { }

  async create(createRuleDto: CreateRuleDto) {
    createRuleDto.name = createRuleDto.name.toLowerCase();
    if (createRuleDto.leader) createRuleDto.leader = new Types.ObjectId(createRuleDto.leader).toString();
    try {
      const rule = await this.ruleModel.create(createRuleDto);
      return `Rule ${rule.name} created`;
    } catch (error) {
      this.handleError(error);
    }
  }

  findAll() {
    return this.ruleModel.find();
  }

  async findOne(term: string) {
    let query = !isNaN(+term) ? { id: term } :
      isValidObjectId(term) ? { _id: term } :
        { name: term.toLocaleLowerCase().trim() };

    let rule = this.ruleModel.findOne(query);

    if (!rule)
      throw new Error(`Rule with term ${term} not found`);
    return rule;
  }

  async update(term: string, updateRuleDto: UpdateRuleDto) {
    const rule = await this.findOne(term);
    if (updateRuleDto.name) updateRuleDto.name = updateRuleDto.name.toLowerCase();
    try {
      await rule.updateOne(updateRuleDto, { new: true });
      return { ...rule.toJSON(), ...updateRuleDto };
    } catch (error) {
      this.handleError(error);
    }
  }

  async remove(id: string) {
    const { deletedCount } = await this.ruleModel.deleteOne({ _id: id });
    if (deletedCount === 0)
      throw new BadRequestException(`Rule with id ${id} not found`);
    return `Rule with id ${id} deleted`;
  }

  private handleError(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(`Rule already exists in the database ${JSON.stringify(error.keyValue)}`);
    }
    console.log(error);
    throw new InternalServerErrorException('Internal server error');
  }
}