import { Request, Response } from "express";
import Order from "../model/Order";

const reserveCar = async (req: Request, res: Response) => {
  try {
    console.log("Request Body:", req.body);

    const { items, details } = req.body;

    const totalPrice = items.reduce(
      (total: number, item: { pricePerDay: number, quantity: number }) => {
        return total + item.pricePerDay * item.quantity;
      },
      0
    );

    // Create a new order instance
    const order = new Order({ items, totalPrice, details });

    // Save the order to the database
    await order.save();

    res.status(200).json({ message: "Order created successfully", order });
  } catch (err) {
    // Handle errors
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export default {
  reserveCar,
};
