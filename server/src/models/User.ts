import mongoose, { Document, Schema, Model } from 'mongoose';

export type UserRole = 'general' | 'student' | 'teacher' | 'admin';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  createdAt: Date;
}

const UserSchema: Schema<IUser> = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ['general', 'student', 'teacher', 'principal'],
      default: 'general',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const User: Model<IUser> = mongoose.model<IUser>('User', UserSchema);

export default User;
