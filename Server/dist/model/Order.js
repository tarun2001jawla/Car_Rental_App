"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
// Define the schema for the user details
const userDetailsSchema = new mongoose_1.Schema({
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
const orderSchema = new mongoose_1.Schema({
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
const Order = mongoose_1.default.model("Order", orderSchema);
// Export the Order model
exports.default = Order;
//# sourceMappingURL=Order.js.map