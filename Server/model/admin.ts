import mongoose, { Document, Schema } from "mongoose";

interface IAdmin extends Document {
  name: string;
  email: string;
  password: string; 
}

const adminSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      require: true,
    },
    
  },
  { timestamps: true }
);

const Admin = mongoose.model<IAdmin>("Admin",adminSchema);
export default Admin;
