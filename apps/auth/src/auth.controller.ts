import { Controller, Post, UseGuards } from '@nestjs/common';
import { AuthenticationService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthenticationService) {}
  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login() {}
  // async login(@Request() req) {
  //return req.user;
  //}
}
