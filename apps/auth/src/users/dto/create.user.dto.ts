import { BaseSchema } from '@app/common';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { Types } from 'mongoose';

export class CreateUserDto extends BaseSchema {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsStrongPassword()
  @IsNotEmpty()
  password: string;

  // @IsNotEmpty()
  // @IsString()
  // @IsOptional()
  // reservations?: Types.ObjectId[];
}

export type CreateUserType = typeof CreateUserDto;
