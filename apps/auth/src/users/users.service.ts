import { BaseRepository } from '@app/common';
import { Injectable } from '@nestjs/common';
import { User } from './models/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';

@Injectable()
export class UsersService extends BaseRepository<User> {
  constructor(@InjectModel(User.name) userModel: Model<User>) {
    super(userModel);
  }

  async createUser(user: CreateUserDto) {
    return await this.create(user);
  }

  async findOne(user: CreateUserDto) {
    return await this.findOne(user);
  }

  async findOneAndUpdate(user: CreateUserDto, update: UpdateUserDto) {
    return await this.findOneAndUpdate(user, update);
  }

  async findMany(users: CreateUserDto[]) {
    return await this.findMany(users);
  }
  async findAll() {
    return await this.findAll();
  }

  async findOneAndDelete(user: CreateUserDto) {
    return await this.findOneAndDelete(user);
  }
}
