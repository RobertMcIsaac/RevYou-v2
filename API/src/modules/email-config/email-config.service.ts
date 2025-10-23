import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { EmailConfig, EmailConfigDocument } from './schema/email-config.schema';
import { Model, Types } from 'mongoose';
import { CreateEmailConfigDto } from './dto/create-email-config.dto';

@Injectable()
export class EmailConfigService {
  private readonly logger = new Logger(EmailConfigService.name);
  constructor(
    @InjectModel(EmailConfig.name)
    private emailConfigModel: Model<EmailConfigDocument>,
  ) {}

  // TODO: Deconstruct DTO and add sensitive data encryption
  async createEmailConfig(createEmailConfigDto: CreateEmailConfigDto) {
    const emailConfig = new this.emailConfigModel(createEmailConfigDto);
    return await emailConfig.save();
  }

  async getEmailConfig(userId: string) {
    if (!userId) {
      this.logger.warn('User id is required');
      throw new BadRequestException('User id is required');
    }

    return this.emailConfigModel.findOne({
      userId: new Types.ObjectId(userId),
    });
  }

  async updateEmailConfig(userId: string, emailConfig: EmailConfigDocument) {
    if (!userId) {
      this.logger.warn('User id is required');
      throw new BadRequestException('User id is required');
    }

    return this.emailConfigModel
      .findOneAndUpdate({
        userId: new Types.ObjectId(userId),
        emailConfig: emailConfig,
      })
      .exec();
  }
}
