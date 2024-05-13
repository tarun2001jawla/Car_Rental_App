"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Car_1 = __importDefault(require("../model/Car"));
// Get all cars
const getAllCars = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cars = yield Car_1.default.find();
        console.log("All cars fetched successfully");
        res.json(cars);
        return cars;
    }
    catch (err) {
        console.error("Error fetching all cars:", err);
        res.status(500).json({ message: 'Server error' });
    }
});
// Create a new car
const createCar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('req.user in createCar:', req.user);
        const { type, make, year, mileage, fuelType, transmission, seats, pricePerDay, licensePlate, Car_model, availability } = req.body;
        console.log("req body", req.body);
        console.log('Uploaded file:', req.file);
        const CoverImageURL = req.file ? `/images/${req.file.filename}` : '';
        console.log('URL:', CoverImageURL); // Get the uploaded file path
        const newCar = new Car_1.default({
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
        const car = yield newCar.save();
        console.log("New car created successfully:", car);
        res.status(201).json(car);
    }
    catch (err) {
        console.error("Error creating a new car:", err);
        res.status(500).json({ message: 'Error creating a new car' });
    }
});
// Delete car by id
const deleteCar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const car = yield Car_1.default.findByIdAndDelete(req.params.id);
        if (!car) {
            console.log("Car not found");
            return res.status(404).json({ message: 'Car not found' });
        }
        console.log("Car deleted successfully");
        res.json({ message: "Car deleted successfully" });
    }
    catch (err) {
        console.error("Error deleting car by id:", err);
        res.status(500).json({ message: 'Server error' });
    }
});
exports.default = {
    getAllCars,
    createCar,
    deleteCar
};
//# sourceMappingURL=carContoller.js.map