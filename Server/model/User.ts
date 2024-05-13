import mongoose, { Document, Schema } from "mongoose";
import findOrCreate from 'mongoose-findorcreate';

// Define an enumeration for user roles
enum UserRole {
  USER = 'user',
  ADMIN = 'admin'
}

// Define the user interface extending mongoose Document
interface IUser extends Document {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: UserRole; // Define role as enum
  googleId?: string;
  githubId?: string;
}

// Define the user schema
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
      enum: Object.values(UserRole), // Ensure role is one of the defined enums
      default: UserRole.USER, // Default role is user
      required: false, // Not required as it has a default value
    },
    googleId: { type: String }, // Google ID for OAuth
    githubId: { type: String }, // GitHub ID for OAuth
  },
  { timestamps: true } // Automatically add createdAt and updatedAt fields
);

// Use the findOrCreate plugin for mongoose
userSchema.plugin(findOrCreate);

// Create the User model
const User = mongoose.model<IUser>("User", userSchema);

// Export the User model
export default User;
