import { Module } from '@nestjs/common';
import { EmailConfigService } from './email-config.service';
import { EmailConfigController } from './email-config.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { EmailConfig, EmailConfigSchema } from './schema/email-config.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: EmailConfig.name, schema: EmailConfigSchema },
    ]),
  ],
  providers: [EmailConfigService],
  controllers: [EmailConfigController],
  exports: [EmailConfigService],
})
export class EmailConfigModule {}
