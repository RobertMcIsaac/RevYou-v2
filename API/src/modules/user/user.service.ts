import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { User } from './schema/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  // CREATE USER
  async create(sub: string, createUserDto: CreateUserDto): Promise<User> {
    if (!sub) {
      throw new BadRequestException('A valid auth0 sub is required.');
    }
    // take auth0Id (sub) from Access token (passed in via controller) rather than request body/ dto
    const userProfile = { ...createUserDto, auth0Id: sub };
    try {
      return await this.userModel.create(userProfile);
    } catch (error) {
      console.log('Error creating user.', error);
      throw new InternalServerErrorException('Error creating user.');
    }
  }

  // FIND USER BY AUTH0 ID
  async findOneByAuth0Id(sub: string): Promise<User> {
    try {
      const user = await this.userModel.findOne({ auth0Id: sub }).exec();
      if (!user) {
        throw new NotFoundException('User not found.');
      }
      return user;
    } catch (error) {
      console.log('Error finding user.', error);
      throw new InternalServerErrorException(
        'Internal server error while fetching user.',
      );
    }
  }

  // FIND USER BY MONGODB ID
  async findUserById(id: string): Promise<User> {
    try {
      const user = await this.userModel.findById(id).exec();
      if (!user) {
        throw new NotFoundException('User not found.');
      }
      return user;
    } catch (error) {
      console.log('Error finding user.', error);
      throw new InternalServerErrorException(
        'Internal server error while fetching user.',
      );
    }
  }

  // UPDATE USER
  async update(sub: string, updateUserDto: UpdateUserDto): Promise<User> {
    if (!sub) {
      throw new BadRequestException('A valid auth0 sub is required.');
    }
    try {
      const updatedUser = await this.userModel
        .findOneAndUpdate({ auth0Id: sub }, updateUserDto, {
          new: true,
          runValidators: true,
        })
        .exec();
      if (!updatedUser) {
        throw new NotFoundException('Failed to update user details.');
      }
      return updatedUser;
    } catch (error) {
      console.log('Error updating user.', error);
      throw new InternalServerErrorException(
        'Internal server error while updating user.',
      );
    }
  }

  // async deleteUser(id: string): Promise<User | null> {
  //   return this.userModel.findByIdAndDelete(id).exec();
  // }
}

// // getUserByauth0Sub = async (auth0Sub) => {}
// // createUser = async (auth0Sub, userProfile) => {}
// // updateUserProfile = async (auth0Sub, updates) => {}
