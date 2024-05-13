import Order from "../model/Order";

const getAllOrders = async (req, res) => {
    try {
      const orders = await Order.find();
      res.status(200).json({ allOrders: orders });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching orders', error });
    }
  };

  export default {getAllOrders};