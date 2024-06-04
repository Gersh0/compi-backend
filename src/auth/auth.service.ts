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
      const user = await this.userModel.create({
        ...userData,
        password: await bcrypt.hashSync(password, 10)
      });

      user.password = '';
      const userObject = user.toObject();
      delete userObject.password;
      return {
        userObject,
        token: this.getJwtToken({ email: user.email })
      };
    } catch (error) {
      this.handleDBErrors(error);
    }
    return 'This action adds a new auth';
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
