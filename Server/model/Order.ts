import mongoose, { Document, Schema } from "mongoose";

interface OrderItem {
  carID: string;
  make: string;
  Car_model: string; 
  year: number; 
  mileage: number; 
  fuelType: string;
  transmission: string;
  seats: number; 
  pricePerDay: number; 
  quantity : number;
  
}

interface UserDetails {
  name: string;
  phone: string;
  email: string;
  license : string;
}

interface OrderDocument extends Document {
  items: OrderItem[];
  totalPrice: number;
  details: UserDetails;
}

const userDetailsSchema = new Schema<UserDetails>({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
 
  email: {
    type: String,
    required: true,
  },
  license : {
    type: String,
    required: true,
  }
},{timestamps:true});

const orderSchema = new Schema<OrderDocument>({
  items: [
    {
      carID: { type: String, required: true },
      quantity: { type: Number, required: true },
    },
  ],
  totalPrice: { type: Number, required: true },
  details: { type: userDetailsSchema, required: true },
});

const Order = mongoose.model<OrderDocument>("Order", orderSchema);

export default Order;