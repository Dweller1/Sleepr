import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create.user.dto';
import { Types } from 'mongoose';
import { UpdateUserDto } from './dto/update.user.dto';
import { PasswordInterceptor } from '../interceptors/password.interceptor';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('create')
  @UseInterceptors(PasswordInterceptor)
  async createUser(@Body() createUser: CreateUserDto) {
    return await this.usersService.createUser(createUser);
  }

  @Get('all')
  async findAll() {
    return await this.usersService.findAll();
  }

  @Get(':id')
  async findOneUser(@Param('id') id: string) {
    return await this.usersService.findOne({ _id: new Types.ObjectId(id) });
  }

  @Patch(':id')
  async findOneAndUpdate(
    @Param('id') id: string,
    @Body() updateUser: UpdateUserDto,
  ) {
    return await this.usersService.findOneAndUpdate(
      { _id: new Types.ObjectId(id) },
      updateUser,
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.usersService.findOneAndDeleteUser({
      _id: new Types.ObjectId(id),
    });
  }
  @Get()
  async getManyUsers(@Query() user: CreateUserDto) {
    return await this.usersService.findMany(user);
  }
}
