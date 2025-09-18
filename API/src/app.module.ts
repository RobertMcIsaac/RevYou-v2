import { Module } from '@nestjs/common';
import { LoggerModule } from 'pino-nestjs';
import pino from 'pino';
import { ExampleModule } from './modules/example/example.module';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ExampleModule,
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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
