import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UsersModule } from './users/users.module';
import { AuthenticationService } from './auth.service';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [UsersModule],
  controllers: [AuthController],
  providers: [AuthenticationService, LocalStrategy],
})
export class AuthModule {}
