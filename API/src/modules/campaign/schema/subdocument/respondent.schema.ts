import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Response } from './response.schema';

@Schema({ _id: false })
export class Respondent {
  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: false })
  role: string;

  @Prop({ required: true, unique: true })
  link: string;

  @Prop({ default: false })
  isResponded: boolean;

  @Prop({ type: [Response], default: [] })
  responses?: Response[];
}

export const RespondentSchema = SchemaFactory.createForClass(Respondent);
