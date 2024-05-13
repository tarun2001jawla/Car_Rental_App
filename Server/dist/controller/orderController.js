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
const Order_1 = __importDefault(require("../model/Order"));
const reserveCar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Request Body:", req.body);
        const { items, details } = req.body;
        const totalPrice = items.reduce((total, item) => {
            return total + item.pricePerDay * item.quantity;
        }, 0);
        // Create a new order instance
        const order = new Order_1.default({ items, totalPrice, details });
        // Save the order to the database
        yield order.save();
        res.status(200).json({ message: "Order created successfully", order });
    }
    catch (err) {
        // Handle errors
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});
exports.default = {
    reserveCar,
};
//# sourceMappingURL=orderController.js.map