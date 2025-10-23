import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from '@/modules/user/schema/user.schema';
import { HydratedDocument, Types } from 'mongoose';

export type EmailConfigDocument = HydratedDocument<EmailConfig>;

@Schema()
export class EmailConfig {
  @Prop({ type: Types.ObjectId, ref: 'User' })
  userId: User;

  @Prop({ required: true })
  emailUsername: string;

  @Prop({ required: true })
  emailPassword: string;

  @Prop({ required: true })
  emailSmtpPort: number;

  @Prop({ required: true })
  emailSmtpServer: string;

  @Prop({ required: true })
  emailStartTls: boolean;

  @Prop({ required: true })
  emailSslTls: boolean;
}

export const EmailConfgSchema = SchemaFactory.createForClass(EmailConfig);
