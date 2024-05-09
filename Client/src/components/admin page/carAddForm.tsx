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
  Text,
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Heading,
} from '@chakra-ui/react';
import './carAddForm.css'

interface CarFormData {
  type: string;
  make: string;
  Car_model: string;
  year: number;
  mileage: number;
  fuelType: string;
  transmission: string;
  seats: number;
  pricePerDay: number;
  licensePlate: string;
  availability: number;
}

const CarAddForm: React.FC = () => {
    const navigate = useNavigate();
  const [formData, setFormData] = useState<CarFormData>({
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
  const [file, setFile] = useState<File | null>(null);
  const toast = useToast();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === 'pricePerDay' || name === 'seats' || name === 'mileage' || name === 'availability') {
      setFormData({...formData, [name]: Number(value) });
    } else {
      setFormData({...formData, [name]: value });
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.size > 5 * 1024 * 1024) {
      toast({
        title: 'File too large',
        description: 'The maximum file size is 5MB',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } else {
      setFile(file || null);
    }
  };
  

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formDataWithFile = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataWithFile.append(key, String(value));
      });
      if (file) {
        formDataWithFile.append('coverImage', file);
      }
      console.log('Sending form data:', formDataWithFile);
      const response = await axios.post('http://localhost:5000/api/admin/add', formDataWithFile, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Response from server:', response.data);
      toast({
        title: 'Car added successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: 'Error adding car',
        status: 'error',
        duration: 3000,
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
            <Input type="text" name="make" value={formData.make} onChange={handleChange} required />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Model</FormLabel>
            <Input type="text" name="Car_model" value={formData.Car_model} onChange={handleChange} required />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Year</FormLabel>
            <NumberInput value={formData.year} onChange={(value) => setFormData({ ...formData, year: parseInt(value) })}>
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Mileage</FormLabel>
            <NumberInput value={formData.mileage} onChange={(value) => setFormData({ ...formData, mileage: parseInt(value) })}>
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Fuel Type</FormLabel>
            <Select name="fuelType" value={formData.fuelType} onChange={handleChange}>
              <option value="">Select Fuel Type</option>
              <option value="petrol">Petrol</option>
              <option value="diesel">Diesel</option>
              <option value="electric">Electric</option>
            </Select>
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Transmission</FormLabel>
            <Select name="transmission" value={formData.transmission} onChange={handleChange}>
              <option value="">Select Transmission</option>
              <option value="manual">Manual</option>
              <option value="automatic">Automatic</option>
            </Select>
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Seats</FormLabel>
            <NumberInput value={formData.seats} onChange={(value) => setFormData({ ...formData, seats: parseInt(value)})}>
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Price Per Day</FormLabel>
            <NumberInput value={formData.pricePerDay} onChange={(value) => setFormData({ ...formData, pricePerDay:  parseInt(value)})}>
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>License Plate</FormLabel>
            <Input type="text" name="licensePlate" value={formData.licensePlate} onChange={handleChange} required />
          </FormControl>
          <FormControl mb={4}>
            
            <Text fontSize="sm" color="gray.500">
              Upload a file (max 5MB)
            </Text>
            <Flex align="center" mt={2}>
              <Input type="file" accept="image/*" onChange={handleFileUpload} />
              
            </Flex>
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Availability</FormLabel>
            <NumberInput value={formData.availability} onChange={(value) => setFormData({ ...formData, availability: parseInt(value) })}>
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
          <Flex justify="flex-end">
            <Button
              variant="ghost"
              mr={4}
              onClick={() => navigate("/admin/login")}
            >
              Cancel
            </Button>
            <Button colorScheme="teal" type="submit">
              Add Car
            </Button>
          </Flex>
        </form>
        <Button mt={4} onClick={() => navigate('/admin/orders')}>
          Go to All Orders
        </Button>
      </Box>
    </Flex>
  );
};

export default CarAddForm;