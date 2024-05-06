import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Box, FormControl, FormLabel, Input, Button, Flex, Text } from '@chakra-ui/react';
import { toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const SignupForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    password: '',
    email: '',
    phone: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault(); 
    console.log('Form Data:', formData);
    try {
      const response = await axios.post('http://localhost:5000/api/users/signup', formData);
      console.log('Response:', response);
      toast('🎉 Signup successful!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });

      setFormData({
        name: '',
        password: '',
        email: '',
        phone: '',
      });
    } catch (err) {
      console.error('Error occurred while signing up:', err);
      toast.error(`Error occurred while signing up: ${err}`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  return (
    <div className='signup-container'>
        
    <Flex flexDirection="column" alignItems="center" justifyContent="center" height="100vh" bg="gray.100">
  
      <Box bg="white" p={8} borderRadius={8} boxShadow="lg">
      <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <FormControl isRequired>
            <FormLabel htmlFor="name">Name</FormLabel>
            <Input type="text" id="name" value={formData.name} onChange={handleChange} name="name" />
          </FormControl>
          <FormControl isRequired mt={4}>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input type="email" id="email" value={formData.email} onChange={handleChange} name="email" />
            <Text fontSize="sm" color="gray.500" mt={1}>We'll never share your email.</Text>
          </FormControl>
          <FormControl isRequired mt={4}>
            <FormLabel htmlFor="phone">Phone</FormLabel>
            <Input type="tel" id="phone" value={formData.phone} onChange={handleChange} name="phone" />
          </FormControl>
          <FormControl isRequired mt={4}>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input type="password" id="password" value={formData.password} onChange={handleChange} name="password" />
            <Text fontSize="sm" color="gray.500" mt={1}>Minimum length: 6</Text>
          </FormControl>
          <Button type="submit" mt={4} bg="blue.500" color="white" _hover={{ bg: "blue.600" }}>
            Sign Up
          </Button>
        </form>
      </Box>
    </Flex>
    </div>
  );
}

export default SignupForm;
