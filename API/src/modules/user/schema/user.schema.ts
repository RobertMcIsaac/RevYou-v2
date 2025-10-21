import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true, trim: true })
  auth0Id: string;

  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: false, trim: true })
  firstName: string;

  @Prop({ required: false, trim: true })
  lastName: string;

  @Prop({ required: true, unique: true, lowercase: true })
  email: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
