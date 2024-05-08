import React, { useContext, useState } from 'react';
import { Box, Heading, Text, Grid, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, ModalCloseButton } from '@chakra-ui/react';
import { CartContext } from '../../components/context/CartContext';
import CarReservationConfirmForm from '../../components/ReservationConfirmForm/ReservationForm';

interface UserDetails {
  name: string;
  phone: string;
  address: string;
  email: string;
  license: string;
  quantity: number;
  startDate: string;
  endDate: string;
}

const Cart: React.FC = () => {
  const { cartItems, removeFromCart, completeOrder } = useContext(CartContext);
  const [showConfirmForm, setShowConfirmForm] = useState(false);

  // Handle order completion with address data
  const handleCompleteOrder = (userDetails: UserDetails) => {
    completeOrder(userDetails);
    setShowConfirmForm(false); 
  };

  // Handle confirm order button click
  const handleConfirmOrder = () => {
    setShowConfirmForm(true);
  };

  // Close the address form dialog
  const handleCloseAddressForm = () => {
    setShowConfirmForm(false);
  };

  return (
    <Box>
      <Heading mb="4">Cart</Heading>
      {cartItems.length === 0 ? (
        <Text>Your cart is empty.</Text>
      ) : (
        <>
          <Grid templateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={6} mb="4">
            {cartItems.map((item) => (
              <Box key={item.carID} borderWidth="1px" borderRadius="lg" overflow="hidden" p="4">
                <Heading size="sm" mb="2">
                  {item.make} {item.Car_model}
                </Heading>
                <Text>Year: {item.year}</Text>
                <Text>Quantity: {item.quantity}</Text>
                <Text>Price per Day: ${item.pricePerDay.toFixed(2)}</Text>
                <Text>Total Price: ${(item.pricePerDay * item.quantity).toFixed(2)}</Text>
                <Button colorScheme="red" mt="4" onClick={() => removeFromCart(item.carID)}>
                  Remove
                </Button>
              </Box>
            ))}
          </Grid>
          <Button colorScheme="teal" onClick={handleConfirmOrder}>
            Confirm Order
          </Button>
        </>
      )}
      <Modal isOpen={showConfirmForm} onClose={handleCloseAddressForm}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Enter Your Details to Confirm Car Booking</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <CarReservationConfirmForm
              isOpen={showConfirmForm}
              onClose={handleCloseAddressForm}
              onConfirm={handleCompleteOrder}
              carDetails={{
                make: cartItems[0].make,
                Car_model: cartItems[0].Car_model,
                year: cartItems[0].year,
                pricePerDay: cartItems[0].pricePerDay,
              }}
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={handleCloseAddressForm}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Cart;
