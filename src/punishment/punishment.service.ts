import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePunishmentDto } from './dto/create-punishment.dto';
import { UpdatePunishmentDto } from './dto/update-punishment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Punishment } from './entities/punishment.entity';
import { Model } from 'mongoose';

@Injectable()
export class PunishmentService {
  constructor(
    @InjectModel(Punishment.name)
    private punishmentModel: Model<Punishment>
  ) { }

  async create(createPunishmentDto: CreatePunishmentDto) {

    try {
      const punishment = await this.punishmentModel.create(createPunishmentDto);
      return `Punishment ${punishment.id} created`;
    } catch (error) {
      this.handleError(error);
    }
  }

  async findAll() {
    return this.punishmentModel.find();
  }

  async findOne(term: string) {
    let query = !isNaN(+term) ? { id: term } : { _id: term };

    let punishment = await this.punishmentModel.findOne(query);

    if (!punishment)
      throw new NotFoundException(`Punishment with term ${term} not found`);
    return punishment;
  }

  async update(term: string, updatePunishmentDto: UpdatePunishmentDto) {
    const punishment = await this.findOne(term);
    try {
      await punishment.updateOne(updatePunishmentDto, { new: true });
      return { ...punishment.toJSON(), ...updatePunishmentDto };
    } catch (error) {
      this.handleError(error);
    }
  }

  async remove(term: string) {
    const { deletedCount } = await this.punishmentModel.deleteOne({ _id: term });
    if (deletedCount === 0)
      throw new BadRequestException(`Punishment with id ${term} not found`);
    return `Punishment with id ${term} deleted`;
  }

  private handleError(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(`Mission already exists in the database ${JSON.stringify(error.keyValue)}`);
    }
    console.log(error);
    throw new InternalServerErrorException(`Can't create punishment`);
  }
}
