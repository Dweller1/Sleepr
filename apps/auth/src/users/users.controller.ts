import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create.user.dto';
import { Types } from 'mongoose';
import { UpdateUserDto } from './dto/update.user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  async findOneUser(@Param('id') id: Types.ObjectId) {
    return await this.usersService.findOne(id);
  }

  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }

  @Patch(':id')
  async findOneAndUpdate(
    @Param('id') id: Types.ObjectId,
    @Body() updateUser: UpdateUserDto,
  ) {
    return await this.usersService.findOneAndUpdate(id, updateUser);
  }

  @Delete(':id')
  async remove(@Param('id') id: Types.ObjectId) {
    await this.usersService.findOneAndDeleteUser(id);
  }
  @Get(':id')
  async getManyUsers(@Param('id') user: CreateUserDto) {
    return await this.usersService.findMany(user);
  }
}
