import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { Mission } from './entities/mission.entity';
import { CreateMissionDto } from './dto/create-mission.dto';
import { UpdateMissionDto } from './dto/update-mission.dto';

@Injectable()
export class MissionService {
  constructor(
    @InjectModel(Mission.name)
    private missionModel: Model<Mission>
  ) { }

  async create(createMissionDto: CreateMissionDto) {
    createMissionDto.name = createMissionDto.name.toLowerCase();
    try {
      const mission = await this.missionModel.create(createMissionDto);
      return `Mission ${mission.name} created`;
    } catch (error) {
      this.handleError(error);
    }
  }

  async findAll() {
    return this.missionModel.find();
  }

  async findOne(term: string) {
    let query = !isNaN(+term) ? { id: term } :
      isValidObjectId(term) ? { _id: term } :
        { name: term.toLocaleLowerCase().trim() };

    let mission = await this.missionModel.findOne(query);

    if (!mission)
      throw new NotFoundException(`Mission with term ${term} not found`);
    return mission;
  }

  async update(term: string, updateMissionDto: UpdateMissionDto) {
    const mission = await this.findOne(term);
    if (updateMissionDto.name) updateMissionDto.name = updateMissionDto.name.toLowerCase();
    try {
      await mission.updateOne(updateMissionDto, { new: true });
      return { ...mission.toJSON(), ...updateMissionDto };
    } catch (error) {
      this.handleError(error);
    }
  }

  async remove(id: string) {
    const { deletedCount } = await this.missionModel.deleteOne({ _id: id });
    if (deletedCount === 0)
      throw new BadRequestException(`Mission with id ${id} not found`);
    return `Mission with id ${id} deleted`;
  }

  private handleError(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(`Mission already exists in the database ${JSON.stringify(error.keyValue)}`);
    }
    console.log(error);
    throw new InternalServerErrorException(`Can't create mission`);
  }
}