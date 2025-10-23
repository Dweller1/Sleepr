import { BaseSchema } from '@app/common/abstract/base.model';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Types } from 'mongoose';

export class CreateReservationDto extends BaseSchema {
  @IsDate()
  @IsNotEmpty()
  @Type(() => Date) // in postman without this could not pass, cause postman was expacting an instance
  timestamp: Date;

  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  startDate: Date;

  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  endDate: Date;

  // there should be no reservation without user that's why userId is not optional
  //@ValidateNested()
  @IsString()
  @IsNotEmpty()
  userId: Types.ObjectId;

  @IsString()
  @IsNotEmpty()
  placeId: string;

  @IsString()
  @IsNotEmpty()
  invoiceId: string;
}

export type createReservationType = typeof CreateReservationDto;
