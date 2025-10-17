import { Module } from '@nestjs/common';
import { UserSchema, User } from './schema/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user.service';
import { UserController } from './user.controller';

// import { MongooseModule } from '@nestjs/mongoose';
// import { UserService } from './service/user.service';
// import { UserController } from './controller/user.controller';
// import { User, UserSchema } from './schema/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
