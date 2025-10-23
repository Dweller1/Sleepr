import { HttpException, Injectable } from '@nestjs/common';
import { UsersService } from './users/users.service';
import { CreateUserDto } from './users/dto/create.user.dto';
import { PinoLogger } from 'nestjs-pino';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

interface Payload {
  name: string;
  _id: string;
}

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  protected readonly logger: PinoLogger;
  async validateUser(email: string, password: string) {
    try {
      const user = await this.usersService.findOne({ email });

      if (!user) {
        this.logger.debug('User not found with email:', email);
        return null;
      }

      const comparedPasswords = await bcrypt.compare(password, user.password);
      if (comparedPasswords) {
        const { password, ...result } = user;
        return result;
      } else {
        this.logger.debug('Incorrect password for email:', email);
        return null;
      }
    } catch (error) {
      this.logger.debug('Authentication error:', error);
      return null;
    }
  }

  async login(user: Payload) {
    const payload = { name: user.name, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
