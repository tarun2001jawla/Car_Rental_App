import mongoose, { Document, Schema } from "mongoose";
import findOrCreate from 'mongoose-findorcreate';
enum UserRole {
  USER = 'user',
  ADMIN = 'admin'
}

interface IUser extends Document {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: UserRole; 
  googleId?: string;
  githubId?: string;
}

const userSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.USER ,
      required:false,
    },
    googleId: { type: String },
    githubId: { type: String },
  },
  { timestamps: true }
);
userSchema.plugin(findOrCreate);

const User = mongoose.model<IUser>("User", userSchema);
export default User;
