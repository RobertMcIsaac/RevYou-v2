import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  auth0Id: string;

  @Prop({ required: true, unique: true })
  username: string;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop({ required: true, unique: true })
  email: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

// const mongoose = require('mongoose');
// const { Schema, Types } = mongoose;

// const UserSchema = new Schema(
//   {
//     auth0Id: {
//       //Auth0 sub from Access token
//       type: String,
//       required: [true, 'Auth0 sub is required'],
//       unique: true,
//     },
//     username: {
//       type: String,
//       unique: true,
//       default: '',
//       sparse: true, // allows multiple users with blank username
//       validate: {
//         validator: (v) => v === '' || /^[a-zA-Z0-9_.]+$/.test(v),
//         message:
//           'Username can only contain letters, numbers, underscores, or dots.',
//       },
//     },
//     firstName: {
//       type: String,
//       default: '',
//       validate: {
//         validator: (v) => v === '' || /^[a-zA-ZÀ-ÿ' -]+$/.test(v),
//         message: 'First name contains invalid characters.',
//       },
//     },
//     lastName: {
//       type: String,
//       default: '',
//       validate: {
//         validator: (v) => v === '' || /^[a-zA-ZÀ-ÿ' -]+$/.test(v),
//         message: 'Last name contains invalid characters.',
//       },
//     },
//     email: {
//       type: String,
//       required: true,
//       unique: [true, 'Email is required'],
//       match: [/^[^@\s]+@[^@\s]+\.[^@\s]+$/, 'Must be a valid email.'],
//     },
//   },
//   {
//     timestamps: true, //for createdAt and updatedAt
//   },
// );

// const User = mongoose.model('User', UserSchema);
// module.exports = User;
