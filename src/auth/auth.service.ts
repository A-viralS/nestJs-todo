import { BadGatewayException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { RegisterUserDto } from './dto/register.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { DatabaseService } from 'src/database/database.service';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly dataservice: DatabaseService,
    private readonly jwtservice: JwtService,
  ) {}

  async login(loginData: LoginDto) {
    const { email, password } = loginData;
    const user = await this.dataservice.user.findFirst({
      where: { email },
    });

    if (!user) {
      throw new NotFoundException('User does not exist');
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      throw new UnauthorizedException('Invalid password');
    }

    const token = this.jwtservice.sign({ email, sub: user.id });

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name, // Assuming you have a name field
      },
    };
  }

  async register(registerData: RegisterUserDto) {
    const user = await this.dataservice.user.findFirst({
      where: { email: registerData.email },
    });

    if (user) {
      throw new BadGatewayException('User already exists');
    }

    registerData.password = await bcrypt.hash(registerData.password, 10);
    const res = await this.dataservice.user.create({ data: registerData });
    return res;
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
