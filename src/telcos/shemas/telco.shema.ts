import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TelcoDocument = Telco & Document;

@Schema()
export class Telco {
  @Prop({ required: true, type: String })
  name: string;

  @Prop({ required: true, type: String })
  phoneNumber: string;

  @Prop({ default: new Date(), type: Date })
  createdAt: Date;
}

const TelcoSchema = SchemaFactory.createForClass(Telco);
TelcoSchema.index({ phobeNumber: 'text' });

export { TelcoSchema };
