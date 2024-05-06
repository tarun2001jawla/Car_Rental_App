import mongoose, { Document } from "mongoose";

interface ICar extends Document {
  type: string;
  make: string;
  Car_model: string; 
  year: number; 
  mileage: number; 
  fuelType: string;
  transmission: string;
  seats: number; 
  pricePerDay: number; 
  licensePlate: string;
  CoverImageURL: string;
}

const carSchema = new mongoose.Schema({
    make: {
        type: String,
        required: true
    },
    Car_model: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    mileage: {
        type: Number,
        required: true
    },
    fuelType: {
        type: String,
        required: true
    }, 
    transmission: {
        type: String,
        required: true
    },
    seats: {
        type: Number,
        required: true
    },
    pricePerDay: {
        type: Number,
        required: true
    },
    licensePlate: {
        type: String,
        required: true
    }, 
    CoverImageURL: {
        type: String,
        required: false, 
    }
});

const Car = mongoose.model<ICar>("car", carSchema);
export default Car;
