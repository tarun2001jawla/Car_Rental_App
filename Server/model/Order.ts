import mongoose, { Document, Schema } from "mongoose";

// Define the structure of the items in the order
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
  quantity: number;
}

// Define the structure of the user details for the order
interface UserDetails {
  name: string;
  phone: string;
  email: string;
  license: string;
}

// Define the structure of the order document extending mongoose Document
interface OrderDocument extends Document {
  items: OrderItem[]; // Array of order items
  totalPrice: number; // Total price of the order
  details: UserDetails; // User details for the order
}

// Define the schema for the user details
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
  license: {
    type: String,
    required: true,
  }
}, { timestamps: true }); // Automatically add createdAt and updatedAt fields

// Define the schema for the order
const orderSchema = new Schema<OrderDocument>({
  items: [
    {
      carID: { type: String, required: true }, // Car ID of the item
      quantity: { type: Number, required: true }, // Quantity of the item
    },
  ],
  totalPrice: { type: Number, required: true }, // Total price of the order
  details: { type: userDetailsSchema, required: true }, // User details for the order
});

// Create the Order model
const Order = mongoose.model<OrderDocument>("Order", orderSchema);

// Export the Order model
export default Order;
