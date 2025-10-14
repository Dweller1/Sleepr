import { BaseSchema } from '@app/common';
import { IsEmail, IsString, IsStrongPassword } from 'class-validator';

export class CreateUserDto extends BaseSchema {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;
}

export type CreateUserType = typeof CreateUserDto;
