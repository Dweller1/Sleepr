import { BaseSchema } from '@app/common/abstract/base.model';
import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';

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
  endDate: Date;

  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  placeId: string;

  @IsString()
  @IsNotEmpty()
  invoiceId: string;
}

export type createReservationType = typeof CreateReservationDto;
