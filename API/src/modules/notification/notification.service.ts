import { Injectable } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { EmailConfigService } from '../email-config/email-config.service';
import nodemailer from 'nodemailer';
import Handlebars from 'handlebars';
import fs from 'fs';
import path from 'path';

@Injectable()
export class NotificationService {
  private readonly logger = new Logger(NotificationService.name);
  private transporter: nodemailer.Transporter;
  constructor(private readonly emailConfigService: EmailConfigService) {}

  async sendNotification(
    userId: string,
    link: string,
    to: string,
    projectName: string,
    fromName?: string,
    toName?: string,
  ) {
    if (!link) {
      this.logger.warn('No link provided for notification');
      throw new Error('Link is required to send notification');
    }

    if (!userId) {
      this.logger.warn('Missing userId');
      throw new Error('Missing userId');
    }

    if (!to) {
      this.logger.warn('Missing recipient email address');
      throw new Error('Missing recipient email address');
    }

    if (!projectName) {
      this.logger.warn('Missing project name');
      throw new Error('Missing project name');
    }

    const emailConfig = await this.emailConfigService.getEmailConfig(userId);
    if (!emailConfig) {
      this.logger.warn(`No email configuration found for userId=${userId}`);
      throw new Error('Email configuration not found');
    }

    const templatePath = path.join(
      __dirname,
      'template',
      'feedback-request.template.hbs',
    );
    const templateSource = fs.readFileSync(templatePath, 'utf-8');
    const feedbackRequestTemplate = Handlebars.compile(templateSource);
    const htmlContent = feedbackRequestTemplate({
      feedbackLink: link,
      fromName: fromName || 'RevYou Team',
      toName: toName || to.split('@')[0],
      projectName: projectName,
    });

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
        html: htmlContent,
      });
      this.logger.log(`Feedback request email sent successfully.`);
    } catch (error) {
      this.logger.error(`Failed to send notification: ${error}`);
      throw new Error('Failed to send notification');
    }
  }
}
