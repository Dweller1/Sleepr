import { HttpException, Injectable } from '@nestjs/common';
import { UsersService } from './users/users.service';
import { CreateUserDto } from './users/dto/create.user.dto';
import { PinoLogger } from 'nestjs-pino';

@Injectable()
export class AuthenticationService {
  constructor(private readonly usersService: UsersService) {}
  protected readonly logger: PinoLogger;
  async validateUser(username: CreateUserDto, password: string) {
    const user = await this.usersService.findOne(username);
    // user exists && password is correct
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    } else {
      throw new HttpException('Something went wrong', 404);
      this.logger.debug('Incorrect credentials');
    }
  }
}
