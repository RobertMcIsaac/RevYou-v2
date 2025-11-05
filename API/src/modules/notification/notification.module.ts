import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { EmailConfigModule } from '../email-config/email-config.module';

@Module({
  providers: [NotificationService],
  controllers: [NotificationController],
  imports: [EmailConfigModule],
})
export class NotificationModule {}
