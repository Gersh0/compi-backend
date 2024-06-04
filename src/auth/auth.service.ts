import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { User } from './entities/user.entity';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { CreateUserDto, LoginUserDto } from './dto';

@Injectable()
export class AuthService {
  constructor(

    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,

  ) { }

  async create(createUserDto: CreateUserDto) {
    createUserDto.alias = createUserDto.alias.toLowerCase();
    try {
      const { password, ...userData } = createUserDto;
      let user = await this.userModel.create({
        ...userData,
        password: await bcrypt.hashSync(password, 10)
      });

      user = user.toObject();
      delete user.password;
      delete user._id;
      delete user.__v;
      delete user.id;
      console.log(user);
      return {
        user,
        si: true,
        token: this.getJwtToken({ email: user.email })
      };
    } catch (error) {
      this.handleDBErrors(error);
    }
  }
  /*
  si: boolean
      token: string;
      user: {
          email: string;
          name: string;
          description: string;
      };
  */
  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;
    let user = await this.userModel.findOne({ email }, { _id: 0, email: 1, password: 1, alias: 1, rank: 1, missions: 1 });

    if (!user)
      throw new UnauthorizedException(`Credentials are invalid`);

    if (!bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException(`Credentials are invalid`);

    user = user.toObject();
    delete user.password;

    return {
      si: true,
      user,
      token: this.getJwtToken({ email: user.email })
    };
  }

  async getMember() {
    return await this.userModel.find( {}, { _id: 0, email: 1, alias: 1, rank: 1, missions: 1 });
  }

  async getMembers(term: string) {
    let query = !isNaN(+term) ? { id: term } : { _id: term };

    let user = await this.userModel.findOne(query);

    if (!user)
      throw new BadRequestException(`User with term ${term} not found`);
    return user;
  }

  async validate(token: string): Promise<{ si: boolean; message: string }> {
    try {
      this.jwtService.verify(token);
      return { si: true, message: 'Token is valid' };
    } catch (error) {
      return { si: false, message: error.message };
    }
  }

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }

  private handleDBErrors(error: any): never {
    if (error.code === 23505)
      throw new BadRequestException(`User already exists in the database`);

    if (error.code === 11000) {
      throw new BadRequestException(`User already exists in the database ${JSON.stringify(error.keyValue)}`);
    }
    console.log(error);
    throw new InternalServerErrorException(`Can't create user`);
  }



}
