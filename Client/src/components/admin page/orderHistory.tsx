import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Flex,
  Text,
  Heading,
  Button,
  Card,
  CardBody,
  CardHeader,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

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
      const response = await axios.get('http://localhost:5000/api/admin/orders');
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  return (
    <Flex direction="column" align="center" mt={8}>
      <Heading mb={4}>Order History</Heading>
      <Button colorScheme="blue" mb={4} onClick={() => navigate('/admin/add')}>
        Add Car
      </Button>
      {orders.map((order) => (
        <Card key={order._id} mb={4}>
          <CardHeader>
            <Flex justify="space-between">
              <Text fontWeight="bold">Order ID: {order._id}</Text>
              <Text>Total Price: ${order.totalPrice}</Text>
            </Flex>
          </CardHeader>
          <CardBody>
            <Text>
              Name: {order.details.name}
            </Text>
            <Text>Email: {order.details.email}</Text>
            <Text>License: {order.details.license}</Text>
          </CardBody>
        </Card>
      ))}
    </Flex>
  );
};

export default OrderHistory;