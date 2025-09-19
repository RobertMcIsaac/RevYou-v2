import { ConfigService } from '@nestjs/config';
import { MongooseModuleOptions } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { Logger } from '@nestjs/common';

const logger = new Logger('DatabaseConfig');

export const databaseConfig = (
  configService: ConfigService,
): MongooseModuleOptions => {
  const uri = configService.get<string>('MONGO_URI');

  if (!uri) {
    throw new Error('MONGO_URI environment variable is not defined');
  }

  return {
    uri,
    serverSelectionTimeoutMS: 10000,
    connectTimeoutMS: 10000,
    socketTimeoutMS: 45000,
    maxPoolSize: 50,
    minPoolSize: 5,
    maxIdleTimeMS: 30000,
    retryWrites: true,
    retryReads: true,
    heartbeatFrequencyMS: 10000,

    onConnectionCreate: (connection: Connection) => {
      connection.on('connected', () => {
        logger.log('MongoDB connected');
      });
      return connection;
    },
  };
};
