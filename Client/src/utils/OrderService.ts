import axios from "axios";

interface OrderItem {
  carID: string;
  make: string;
  Car_model: string;
  year: number;
  pricePerDay: number;
  quantity: number;
}

interface UserDetails {
  name: string;
  phone: string;
  email: string;
  license: string;
}

interface OrderData {
  items: OrderItem[];
  totalPrice: number;
  details: UserDetails;
}

const apiUrl = "http://localhost:5000/api/reserve";

export const reserveCar = async (orderData: OrderData) => {
  try {
    const response = await axios.post(apiUrl, orderData);
    return response.data;
  } catch (error) {
    console.log("Error Occurred in Order Function:", error);
    return null;
  }
};