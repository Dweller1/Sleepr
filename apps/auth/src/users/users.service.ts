import { BaseRepository } from '@app/common';
import { Injectable, UseInterceptors } from '@nestjs/common';
import { User } from './models/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';

@Injectable()
export class UsersService extends BaseRepository<User> {
  constructor(@InjectModel(User.name) userModel: Model<User>) {
    super(userModel);
  }
  async createUser(user: CreateUserDto) {
    return await super.create(user);
  }

  async findOne(user: FilterQuery<CreateUserDto>) {
    return await super.findOne(user);
  }

  async findOneAndUpdate(
    user: FilterQuery<CreateUserDto>,
    update: UpdateUserDto,
  ) {
    return await super.findOneAndUpdate(user, update);
  }

  async findMany(users: FilterQuery<CreateUserDto>): Promise<User[]> {
    return await super.findMany(users);
  }
  async findAll() {
    return await super.findAll();
  }

  async findOneAndDeleteUser(user: FilterQuery<CreateUserDto>) {
    return await super.findOneAndDelete(user);
  }
}
