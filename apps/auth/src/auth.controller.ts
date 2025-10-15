import {
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthenticationService } from './auth.service';
import { PasswordInterceptor } from './interceptors/password.interceptor';
import { LocalAuthGuard } from './guards/local.auth.guard';
import { JwtAuthGuard } from './guards/jwt.auth.guard';

// guards protect the routes from an unauthorized access
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthenticationService) {}
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  @UseInterceptors(PasswordInterceptor)
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    return req.user;
  }
}
