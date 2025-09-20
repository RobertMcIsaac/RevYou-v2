import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from '@modules/user/schema/user.schema';
import { Respondent } from './subdocument/respondent.schema';
import { Project } from '@modules/project/schema/project.schema';

export type CampaignDocument = HydratedDocument<Campaign>;

@Schema({ timestamps: true })
export class Campaign {
  @Prop({ required: true })
  title: string;

  @Prop({ required: false })
  description: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  createdBy: User;

  @Prop({
    type: [
      {
        project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
        team: [Respondent],
      },
    ],
  })
  projects: {
    project: Project;
    team: Respondent[];
  }[];
}

export const CampaignSchema = SchemaFactory.createForClass(Campaign);
