import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { User } from '@modules/user/schema/user.schema';
import { Respondent, RespondentSchema } from './subdocument/respondent.schema';
import { Project } from '@modules/project/schema/project.schema';

export type CampaignDocument = HydratedDocument<Campaign>;

@Schema({ timestamps: true })
export class Campaign {
  @Prop({ required: true })
  title: string;

  @Prop({ required: false })
  description: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  createdBy: User;

  @Prop({
    type: [
      {
        project: { type: Types.ObjectId, ref: Project.name },
        team: { type: [RespondentSchema], default: [] },
      },
    ],
  })
  projects: {
    project: Types.ObjectId;
    team: Respondent[];
  }[];
}

export const CampaignSchema = SchemaFactory.createForClass(Campaign);
