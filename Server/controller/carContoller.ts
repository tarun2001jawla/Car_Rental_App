import { Request, Response } from "express";
import Car from "../model/Car";
import { CustomRequest } from "../types";
import multer from 'multer';
import path from "path";
import fs from 'fs';




// Get all cars
const getAllCars = async (req: Request, res: Response) => {
  try {
    const cars = await Car.find();
    console.log("All cars fetched successfully");
    res.json(cars);
    return cars;
  } catch (err) {
    console.error("Error fetching all cars:", err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create a new car
const createCar = async (req: CustomRequest, res: Response) => {
  try {
    console.log('req.user in createCar:', req.user); 
    const { type, make, year, mileage, fuelType, transmission, seats, pricePerDay, licensePlate,Car_model,availability} = req.body;
    console.log("req body", req.body);
    console.log('Uploaded file:', req.file);
    const CoverImageURL = req.file ? `/images/${req.file.filename}` : '';
    console.log('URL:', CoverImageURL);// Get the uploaded file path

    const newCar = new Car({
      type,
      make,
      Car_model,
      year,
      mileage,
      fuelType,
      transmission,
      seats,
      pricePerDay,
      licensePlate,
      CoverImageURL,
      availability
    });

    const car = await newCar.save();
    console.log("New car created successfully:", car);
    res.status(201).json(car);
  } catch (err) {
    console.error("Error creating a new car:", err);
    res.status(500).json({ message: 'Error creating a new car' });
  }
};



// Delete car by id
const deleteCar = async (req: Request, res: Response) => {
  try {
    const car = await Car.findByIdAndDelete(req.params.id);
    if (!car) {
      console.log("Car not found");
      return res.status(404).json({ message: 'Car not found' });
    }
    console.log("Car deleted successfully");
    res.json({ message: "Car deleted successfully" });
  } catch (err) {
    console.error("Error deleting car by id:", err);
    res.status(500).json({ message: 'Server error' });
  }
};

export default {
  getAllCars,
  createCar, 
  deleteCar
};