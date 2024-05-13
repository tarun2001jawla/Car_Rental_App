"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const carSchema = new mongoose_1.default.Schema({
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
    },
    availability: {
        type: Number,
        required: true,
    }
});
const Car = mongoose_1.default.model("car", carSchema);
exports.default = Car;
//# sourceMappingURL=Car.js.map