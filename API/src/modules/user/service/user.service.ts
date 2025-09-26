import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { User } from '../schema/user.schema';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    if (!createUserDto.auth0Id || !createUserDto.email) {
      throw new Error('A valid auth0 sub and email are required.');
    }
    const newUser = await this.userModel.create(createUserDto);
    return newUser;
  }

  async findOneByAuth0Id(auth0Id: string): Promise<User | null> {
    const user = await this.userModel.findOne({ auth0Id: auth0Id }).exec();
    return user;
  }

  async update(auth0Id: string, updateUserDto: UpdateUserDto): Promise<User> {
    // const updatedUser = await this.userModel.findOneAndUpdate(
    //   { auth0Id: auth0Id },
    //   { $set: updates },
    //   { new: true },
    // );
    const updatedUser = await this.userModel
      .findOneAndUpdate({ auth0Id: auth0Id }, updateUserDto, { new: true })
      .exec();
    return updatedUser;
  }

  // async findUserById(id: string): Promise<User | null> {
  //   return this.userModel.findById(id).exec();
  // }

  // async createUser(userData: Partial<User>): Promise<User> {
  //   const newUser = new this.userModel(userData);
  //   return newUser.save();
  // }

  // async updateUser(id: string, userData: Partial<User>): Promise<User | null> {
  //   return this.userModel.findByIdAndUpdate(id, userData, { new: true }).exec();
  // }

  // async deleteUser(id: string): Promise<User | null> {
  //   return this.userModel.findByIdAndDelete(id).exec();
  // }
}

// // getUserByauth0Sub = async (auth0Sub) => {}
// // createUser = async (auth0Sub, userProfile) => {}
// // updateUserProfile = async (auth0Sub, updates) => {}
