import { Injectable } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { EmailConfigService } from '../email-config/email-config.service';
import nodemailer from 'nodemailer';

@Injectable()
export class NotificationService {
  private readonly logger = new Logger(NotificationService.name);
  private transporter: nodemailer.Transporter;
  constructor(private readonly emailConfigService: EmailConfigService) {}

  async sendNotification(userId: string, link: string, to: string) {
    if (!link) {
      this.logger.warn('No link provided for notification');
      throw new Error('Link is required to send notification');
    }

    if (!userId) {
      this.logger.warn('Missing userId');
      throw new Error('Missing userId');
    }

    const emailConfig = await this.emailConfigService.getEmailConfig(userId);
    if (!emailConfig) {
      this.logger.warn(`No email configuration found for userId=${userId}`);
      throw new Error('Email configuration not found');
    }

    this.transporter = nodemailer.createTransport({
      host: emailConfig.emailSmtpServer,
      port: emailConfig.emailSmtpPort,
      secure: emailConfig.emailSslTls,
      auth: {
        user: emailConfig.emailUserName,
        pass: emailConfig.emailPassword,
      },
    });

    try {
      await this.transporter.sendMail({
        from: emailConfig.emailUserName,
        to: to,
        subject: 'RevYou Feedback Request',
        text: `You have a new feedback request: ${link}`,
      });
    } catch (error) {
      this.logger.error(`Failed to send notification: ${error}`);
      throw new Error('Failed to send notification');
    }
  }
}
