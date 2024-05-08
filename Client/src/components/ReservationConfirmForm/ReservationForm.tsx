import React, { useState, FormEvent } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, FormControl, FormLabel, Input, Button, useToast, Flex, IconButton } from '@chakra-ui/react';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import './ReservationForm.css';

interface RentBookingConfirmFormProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (formData: FormData) => void;
  carDetails: {
    make: string;
    Car_model: string;
    year: number;
    pricePerDay: number;
  };
}

interface FormData {
  name: string;
  mobileNumber: string;
  email: string;
  driverLicense: string;
  quantity: number;
  startDate: string; 
  endDate: string; 
  totalPrice: number;
}

const CarReservationConfirmForm: React.FC<RentBookingConfirmFormProps> = ({ isOpen, onClose, onConfirm, carDetails }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    mobileNumber: '',
    email: '',
    driverLicense: '',
    quantity: 1,
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
    totalPrice: carDetails.pricePerDay,
  });
  const toast = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleQuantityIncrease = () => {
    const newQuantity = formData.quantity + 1;
    const newTotalPrice = carDetails.pricePerDay * newQuantity;
    setFormData({ ...formData, quantity: newQuantity, totalPrice: newTotalPrice });
  };

  const handleQuantityDecrease = () => {
    if (formData.quantity > 1) {
      const newQuantity = formData.quantity - 1;
      const newTotalPrice = carDetails.pricePerDay * newQuantity;
      setFormData({ ...formData, quantity: newQuantity, totalPrice: newTotalPrice });
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.mobileNumber || !formData.email || !formData.driverLicense) {
      toast({
        title: 'Error',
        description: 'Please fill in all the required fields.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    onConfirm(formData);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent className="reservation-form">
        <ModalHeader>Enter Your Details to Confirm Car Booking</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit}>
          <ModalBody>
            <FormControl isRequired>
              <FormLabel>Name</FormLabel>
              <Input type="text" name="name" value={formData.name} onChange={handleChange} />
            </FormControl>
            <FormControl isRequired mt={4}>
              <FormLabel>Mobile Number</FormLabel>
              <Input type="tel" name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} />
            </FormControl>
            <FormControl isRequired mt={4}>
              <FormLabel>Email</FormLabel>
              <Input type="email" name="email" value={formData.email} onChange={handleChange} />
            </FormControl>
            <FormControl isRequired mt={4}>
              <FormLabel>Driver's License</FormLabel>
              <Input type="text" name="driverLicense" value={formData.driverLicense} onChange={handleChange} />
            </FormControl>
            <FormControl isRequired mt={4}>
              <FormLabel>Quantity to Rent</FormLabel>
              <Flex>
                <IconButton
                  aria-label="Decrease Quantity"
                  icon={<MinusIcon />}
                  onClick={handleQuantityDecrease}
                  mr={2}
                />
                <Input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  min={1}
                  max={10}
                  readOnly
                />
                <IconButton
                  aria-label="Increase Quantity"
                  icon={<AddIcon />}
                  onClick={handleQuantityIncrease}
                  ml={2}
                />
              </Flex>
            </FormControl>
            <FormControl isRequired mt={4}>
              <FormLabel>Start Date</FormLabel>
              <Input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl isRequired mt={4}>
              <FormLabel>End Date</FormLabel>
              <Input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl isRequired mt={4}>
              <FormLabel>Total Price</FormLabel>
              <Input
                type="number"
                name="totalPrice"
                value={formData.totalPrice}
                onChange={handleChange}
                readOnly
              />
            </FormControl>
            <FormControl isRequired mt={4}>
              <FormLabel>Car Details</FormLabel>
              <Input
                type="text"
                value={`${carDetails.make} ${carDetails.Car_model} - ${carDetails.year}`}
                isReadOnly
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" colorScheme="teal">
              Reserve the Car
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default CarReservationConfirmForm;