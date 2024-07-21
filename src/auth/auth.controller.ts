import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './auth.guard';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  @Post('register')
  @ApiOperation({description: 'Register a new user', summary: 'Register a new user'})
  create(@Body() registerData: RegisterUserDto) {
    return this.authService.register(registerData);
  }
 
  @Post('login')
  @ApiOperation({description: 'Login with email', summary: 'Get all users'})
  login(@Body() loginData: LoginDto) {
    return this.authService.login(loginData);
  }


}
