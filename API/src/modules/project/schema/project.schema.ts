import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type ProjectDocument = HydratedDocument<Project>;

@Schema({ timestamps: true })
export class Project {
  @Prop({ required: true, unique: true })
  title: string;

  @Prop({ required: false })
  description: string;

  @Prop({ required: true })
  startDate: Date;

  @Prop({ required: false })
  endDate: Date;

  _id: Types.ObjectId;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
