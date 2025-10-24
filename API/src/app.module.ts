import { Module } from '@nestjs/common';
import { LoggerModule } from 'pino-nestjs';
import pino from 'pino';
import { ExampleModule } from './modules/example/example.module';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { DatabaseModule } from './modules/database/database.module';
import { CampaignModule } from './modules/campaign/campaign.module';
import { UserModule } from './modules/user/user.module';
import { ProjectModule } from './modules/project/project.module';
import { AuthModule } from './modules/auth/auth.module';
import { EmailConfigModule } from './modules/email-config/email-config.module';

@Module({
  imports: [
    ExampleModule,
    DatabaseModule,
    LoggerModule.forRoot({
      pinoHttp: {
        stream: pino.destination({
          sync: false,
        }),
      },
    }),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: process.env.THROTTLE_TTL
            ? parseInt(process.env.THROTTLE_TTL, 10)
            : 60000,
          limit: process.env.THROTTLE_LIMIT
            ? parseInt(process.env.THROTTLE_LIMIT, 10)
            : 100,
        },
      ],
    }),
    ConfigModule.forRoot(),
    CampaignModule,
    UserModule,
    ProjectModule,
    AuthModule,
    EmailConfigModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
