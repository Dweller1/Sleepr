import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseDocument } from './base.document.type';
import { Types } from 'mongoose';

@Schema({ timestamps: true, id: true })
export class BaseSchema implements BaseDocument {
  @Prop({
    type: Types.ObjectId,
    default: () => new Types.ObjectId(),
    required: true,
  })
  _id: Types.ObjectId;
}

export const BaseSchemaFactory = SchemaFactory.createForClass(BaseSchema);
