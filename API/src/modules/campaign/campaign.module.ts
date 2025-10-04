import { Module } from '@nestjs/common';
import { CampaignService } from './campaign.service';
import { UserModule } from '../user/user.module';
import { Campaign, CampaignSchema } from './schema/campaign.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectModule } from '../project/project.module';
import { CampaignController } from './campaign.controller';

@Module({
  providers: [CampaignService],
  controllers: [CampaignController],
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
