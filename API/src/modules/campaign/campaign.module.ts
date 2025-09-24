import { Module } from '@nestjs/common';
import { CampaignService } from './campaign.service';
import { UserModule } from '../user/user.module';
import { Campaign, CampaignSchema } from './schema/campaign.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectModule } from '../project/project.module';

@Module({
  providers: [CampaignService],
  controllers: [],
  exports: [CampaignService],
  imports: [
    UserModule,
    ProjectModule,
    MongooseModule.forFeature([
      { name: Campaign.name, schema: CampaignSchema },
    ]),
  ],
})
export class CampaignModule {}
