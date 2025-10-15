import { HttpException, Injectable } from '@nestjs/common';
import { UsersService } from './users/users.service';
import { CreateUserDto } from './users/dto/create.user.dto';
import { PinoLogger } from 'nestjs-pino';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from './users/models/user.schema';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  protected readonly logger: PinoLogger;
  async validateUser(username: CreateUserDto, password: string) {
    const user = await this.usersService.findOne(username);
    const comparedPasswords = await bcrypt.compare(user.password, password);
    if (user && comparedPasswords) {
      const { password, ...result } = user;
      return result;
    } else {
      throw new HttpException('Wrong credentials', 404);
      this.logger.debug('Incorrect credentials');
    }
  }

  async login(user: CreateUserDto) {
    const payload = { username: user.name, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(user: CreateUserDto) {
    // check if user exists, if doesn't - create a user
    const potentialUser = await this.usersService.findOne(user);
    if (!potentialUser) {
      return this.usersService.create(potentialUser);
    } else {
      throw new HttpException('User already exists', 400);
      this.logger.debug('User already exists');
    }
  }
}
