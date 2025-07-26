import mongoose, { Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  otp?: string;
  isGoogleUser: boolean;
}

const userSchema = new mongoose.Schema<IUser>({
  email: { type: String, required: true, unique: true },
  otp: { type: String },
  isGoogleUser: { type: Boolean, default: false }
});

const User = mongoose.model<IUser>('User', userSchema);
export default User;
