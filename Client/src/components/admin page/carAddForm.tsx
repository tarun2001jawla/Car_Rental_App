import React, { useState } from 'react';
import axios from 'axios';
import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Flex,
  Input,
  Select,
  Button,
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Heading,
} from '@chakra-ui/react';

const axiosInstance = axios.create({
  withCredentials: true,
});

const CarAddForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    type: '',
    make: '',
    Car_model: '',
    year: 0,
    mileage: 0,
    fuelType: '',
    transmission: '',
    seats: 0,
    pricePerDay: 0,
    licensePlate: '',
    availability: 0,
  });
  const toast = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted with data:', formData);

   
      // Validate form fields
     if (
 !formData.type ||
 !formData.make ||
 !formData.Car_model ||
 !formData.year.toString() ||
 !formData.mileage.toString() ||
 !formData.fuelType ||
 !formData.transmission ||
 !formData.seats.toString() ||
 !formData.pricePerDay.toString() ||
 !formData.licensePlate ||
 !formData.availability.toString()
) {
  toast({
    title: 'Please fill all the fields',
    status: 'error',
    duration: 5000,
    isClosable: true,
  });
  return;
}
  

    try {
      const response = await axiosInstance.post('http://localhost:5000/api/admin/add', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Car added successfully:', response.data);
      toast({
        title: 'Car added successfully',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      setFormData({
        type: '',
        make: '',
        Car_model: '',
        year: 0,
        mileage: 0,
        fuelType: '',
        transmission: '',
        seats: 0,
        pricePerDay: 0,
        licensePlate: '',
        availability: 0,
      });
    } catch (error) {
      console.error('Error adding car:', error);
      toast({
        title: 'Error adding car',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex direction="column" align="center" mt={8}>
      <Box bg="white" p={6} rounded="md" w="500px" boxShadow="md">
        <Heading size="md" mb={4}>
          Add Car
        </Heading>
        <form onSubmit={handleSubmit}>
          <FormControl mb={4}>
            <FormLabel>Type</FormLabel>
            <Input
              type="text"
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Make</FormLabel>
            <Input
              type="text"
              name="make"
              value={formData.make}
              onChange={handleChange}
              required
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Model</FormLabel>
            <Input
              type="text"
              name="Car_model"
              value={formData.Car_model}
              onChange={handleChange}
              required
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Year</FormLabel>
            <NumberInput
              value={formData.year}
              onChange={(value) =>
                setFormData({ ...formData, year: parseInt(value) })
              }
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Mileage</FormLabel>
            <NumberInput
              value={formData.mileage}
              onChange={(value) =>
                setFormData({ ...formData, mileage: parseInt(value) })
              }
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Fuel Type</FormLabel>
            <Select
              name="fuelType"
              value={formData.fuelType}
              onChange={handleChange}
            >
              <option value="">Select Fuel Type</option>
              <option value="petrol">Petrol</option>
              <option value="diesel">Diesel</option>
              <option value="electric">Electric</option>
            </Select>
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Transmission</FormLabel>
            <Select
              name="transmission"
              value={formData.transmission}
              onChange={handleChange}
            >
              <option value="">Select Transmission</option>
              <option value="manual">Manual</option>
              <option value="automatic">Automatic</option>
            </Select>
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Seats</FormLabel>
            <NumberInput
              value={formData.seats}
              onChange={(value) =>
                setFormData({ ...formData, seats: parseInt(value) })
              }
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Price Per Day</FormLabel>
            <NumberInput
              value={formData.pricePerDay}
              onChange={(value) =>
                setFormData({ ...formData, pricePerDay: parseInt(value) })
              }
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>License Plate</FormLabel>
            <Input
              type="text"
              name="licensePlate"
              value={formData.licensePlate}
              onChange={handleChange}
              required
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Availability</FormLabel>
            <NumberInput
              value={formData.availability}
              onChange={(value) =>
                setFormData({ ...formData, availability: parseInt(value) })
              }
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
          <Flex justify="flex-end">
            <Button variant="ghost" mr={4} onClick={() => navigate("/admin/login")}>
              Cancel
            </Button>
            <Button colorScheme="teal" type="submit">
              Add Car
            </Button>
          </Flex>
        </form>
        <Button mt={4} onClick={() => navigate("/admin/orders")}>
          Go to All Orders
        </Button>
      </Box>
    </Flex>
  );
};

export default CarAddForm;
