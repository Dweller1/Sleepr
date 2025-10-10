import { SchemaFactory } from '@nestjs/mongoose';
import { BaseDocument } from '../database';
import { Types } from 'mongoose';

export class BaseSchema implements BaseDocument {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export const BaseSchemaFactory = SchemaFactory.createForClass(BaseSchema);
