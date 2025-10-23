import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { EmailConfig, EmailConfigDocument } from './schema/email-config.schema';
import { Model, Types } from 'mongoose';
import { CreateEmailConfigDto } from './dto/create-email-config.dto';
import { decrypt, encrypt } from '@/common/helper/cryptography.helper';

@Injectable()
export class EmailConfigService {
  private readonly logger = new Logger(EmailConfigService.name);
  constructor(
    @InjectModel(EmailConfig.name)
    private emailConfigModel: Model<EmailConfigDocument>,
  ) {}

  async createEmailConfig(createEmailConfigDto: CreateEmailConfigDto) {
    const updatedEmailConfigDto = {
      ...createEmailConfigDto,
      emailPassword: encrypt(createEmailConfigDto.emailPassword),
    };
    const emailConfig = new this.emailConfigModel(updatedEmailConfigDto);
    this.logger.log(
      `Creating email configuration for userId=${createEmailConfigDto.userId}`,
    );
    return await emailConfig.save();
  }

  async getEmailConfig(userId: string) {
    if (!userId) {
      this.logger.warn('User id is required');
      throw new BadRequestException('User id is required');
    }

    this.logger.log(`Fetching email configuration for userId=${userId}`);
    const emailConfig = await this.emailConfigModel
      .findOne({
        userId,
      })
      .exec();

    if (!emailConfig) {
      this.logger.warn(`No email configuration found for userId=${userId}`);
      throw new NotFoundException('Email configuration not found');
    }
    const decrypedEmailConfig = {
      ...emailConfig.toObject(),
      emailPassword: decrypt(emailConfig.emailPassword),
    };
    return decrypedEmailConfig;
  }

  // TODO: Change the structure of dto to allow partial updates
  async updateEmailConfig(userId: string, emailConfig: CreateEmailConfigDto) {
    if (!userId) {
      this.logger.warn('User id is required');
      throw new BadRequestException('User id is required');
    }

    const updatedEmailConfig = {
      ...emailConfig,
      emailPassword: encrypt(emailConfig.emailPassword),
    };

    return this.emailConfigModel
      .findOneAndUpdate(
        {
          userId: new Types.ObjectId(userId),
        },
        updatedEmailConfig,
        { new: true },
      )
      .exec();
  }
}
