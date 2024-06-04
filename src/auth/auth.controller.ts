import { Controller, Get, Post, Body, UseGuards, Param } from '@nestjs/common';
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
  getMember() {
    return this.authService.getMember();
  }

  @Get('members/:id')
  getMembers(@Param('id') id: string) {
    return this.authService.getMembers(id);
  }

  // to validate a token
  @Post('validate')
  validateToken(@Body('token') token: string) {
    console.log(JSON.stringify(token));
    return this.authService.validate(token);
  }


}
