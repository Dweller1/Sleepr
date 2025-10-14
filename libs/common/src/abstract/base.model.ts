import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { BaseDocument } from './base.document.type';
import { Types } from 'mongoose';

export class BaseSchema implements BaseDocument {
  @Prop()
  _id: Types.ObjectId;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const BaseSchemaFactory = SchemaFactory.createForClass(BaseSchema);
