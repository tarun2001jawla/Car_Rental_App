import React, { useState, useEffect } from "react";
import axios from "axios";
import { Flex, Text, Heading, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import "./orderHistory.css";

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

interface UserDetails {
  name: string;
  phone: string;
  email: string;
  license: string;
}

interface Order {
  _id: string;
  items: OrderItem[];
  totalPrice: number;
  details: UserDetails;
}

const OrderHistory = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/orders");
      setOrders(response.data.allOrders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  return (
    <Flex direction="column" align="center" mt={8}>
        <Button  colorScheme = "pink" onClick={() => navigate("/admin/add")}>Add Car</Button>
      <div className="actions-container">
        <Heading mb={4}>Order History</Heading>
      </div>
      <div className="order-history-container">
        {orders.length > 0 ? (
          orders.map((order) => (
            <div className="order-card" key={order._id}>
              <div className="order-header">
                <Text fontWeight="bold">Order ID: {order._id}</Text>
                <Text>Total Price: ${order.totalPrice}</Text>
              </div>
              <div className="order-body">
                <Text>Name: {order.details.name}</Text>
                <Text>Email: {order.details.email}</Text>
                <Text>License: {order.details.license}</Text>
              </div>
              <Button
                colorScheme="red"
                mb={4}
              >
                View Details
              </Button>
            </div>
          ))
        ) : (
          <Text>No orders found.</Text>
        )}
      </div>
    </Flex>
  );
};

export default OrderHistory;
