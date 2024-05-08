import React, { createContext, useState } from 'react';
import { toast } from 'react-toastify';
import { reserveCar } from '../../utils/OrderService';

interface CartItem {
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
  address: string;
  email: string;
  license: string;
}

interface CartContextValue {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, newQuantity: number) => void;
  completeOrder: (userDetails: UserDetails) => Promise<void>;
}

export const CartContext = createContext<CartContextValue>({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  completeOrder: async () => {},
});

export const CartProvider: React.FC = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    setCartItems((prevItems) => [...prevItems, item]);
  };

  const removeFromCart = (carID: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.carID !== carID));
  };

  const updateQuantity = (carID: string, newQuantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.carID === carID ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const completeOrder = async (userDetails: UserDetails) => {
    try {
      const orderItems = cartItems.map((item) => ({
        carID: item.carID,
        make: item.make,
        Car_model: item.Car_model,
        year: item.year,
        pricePerDay: item.pricePerDay,
        quantity: item.quantity,
      }));

      const totalPrice = orderItems.reduce((total, item) => total + item.pricePerDay * item.quantity, 0);

      const orderData = {
        items: orderItems,
        totalPrice,
        details: userDetails,
      };

      const result = await reserveCar(orderData);

      if (result) {
        setCartItems([]); 
        toast.success('Order placed successfully!');
      } else {
        toast.error('Failed to place order. Please try again later.');
      }
    } catch (error) {
      console.error('Error occurred while placing order:', error);
      toast.error('Failed to place order. Please try again later.');
    }
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateQuantity, completeOrder }}
    >
      {children}
    </CartContext.Provider>
  );
};