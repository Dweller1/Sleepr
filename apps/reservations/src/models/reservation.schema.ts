import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseSchema } from '@app/common/abstract/base.model';
import mongoose, { Types } from 'mongoose';

@Schema({ timestamps: true })
export class Reservation extends BaseSchema {
  @Prop({ required: true })
  startDate: Date;

  @Prop({ required: true })
  endDate: Date;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: Types.ObjectId;

  @Prop({ required: true })
  placeId: string;

  @Prop({ required: true })
  invoiceId: string;
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);

export type ReservationDocument = Reservation & Document;
