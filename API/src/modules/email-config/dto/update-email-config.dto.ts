import { CreateEmailConfigDto } from './create-email-config.dto';
import { OmitType, PartialType } from '@nestjs/swagger';

export class UpdateEmailConfigDto extends PartialType(
  OmitType(CreateEmailConfigDto, ['userId'] as const),
) {}
