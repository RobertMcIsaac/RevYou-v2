import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findUserById(id: string): Promise<User | null> {
    return this.userModel.findById(id).exec();
  }

  async createUser(userData: Partial<User>): Promise<User> {
    const newUser = new this.userModel(userData);
    return newUser.save();
  }

  async updateUser(id: string, userData: Partial<User>): Promise<User | null> {
    return this.userModel.findByIdAndUpdate(id, userData, { new: true }).exec();
  }

  async deleteUser(id: string): Promise<User | null> {
    return this.userModel.findByIdAndDelete(id).exec();
  }
}
