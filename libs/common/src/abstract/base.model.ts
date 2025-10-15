import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { BaseDocument } from './base.document.type';
import { Types } from 'mongoose';

export class BaseSchema implements BaseDocument {
  @Prop({ unique: true, required: true })
  _id: Types.ObjectId;

  @Prop({ required: true })
  createdAt: Date;

  @Prop({ required: true })
  updatedAt: Date;
}

export const BaseSchemaFactory = SchemaFactory.createForClass(BaseSchema);
