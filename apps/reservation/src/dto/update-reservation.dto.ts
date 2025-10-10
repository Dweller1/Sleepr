import { BaseSchema } from '@app/common';
import { PartialType } from '@nestjs/mapped-types';
import { IsDate, IsString } from 'class-validator';

export class CreateReservationDto extends BaseSchema {
  @IsDate()
  timestamp: Date;

  @IsDate()
  startDate: Date;

  @IsDate()
  endDate: Date;

  @IsString()
  userId: string;

  @IsString()
  placeId: string;

  @IsString()
  invoiceId: string;
}

export class UpdateReservationDto extends PartialType(CreateReservationDto) {}
export type updateReservationType = typeof UpdateReservationDto;
