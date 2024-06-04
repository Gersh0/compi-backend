import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('private')
  @UseGuards(AuthGuard())
  testingPrivateRoute() {
    return {
      ok: true,
      message: 'This is a private route'
    }
  }

  @Get('members')
  getMembers() {
    return this.authService.getMembers();
  }

  // to validate a token
  @Post('validate')
  validateToken(@Body('token') token: string) {
    console.log(JSON.stringify(token));
    return this.authService.validate(token);
  }


}
