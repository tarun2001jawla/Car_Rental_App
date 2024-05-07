import React, { useState, ChangeEvent, FormEvent, MouseEvent } from 'react';
import { Box, FormControl, FormLabel, Input, Button, Flex, Text,Link, InputGroup, InputRightElement } from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';

interface FormData {
  name: string;
  password: string;
  email: string;
  phone: string;
}

const SignupForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    password: '',
    email: '',
    phone: '',
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate();

  // Handle form input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle password visibility
  const handlePasswordVisibility = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log('Form Data:', formData);

    try {
      const response = await axios.post('http://localhost:5000/api/users/signup', formData);
      console.log('Response:', response);

      toast('🎉 Signup successful!', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Bounce,
      });

      setFormData({
        name: '',
        password: '',
        email: '',
        phone: '',
      });

      navigate('/login');
    } catch (err) {
      console.error('Error occurred while signing up:', err);
      toast.error(`Error occurred while signing up: ${err}`, {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Bounce,
      });
    }
  };

  return (
    <Flex flexDirection="column" alignItems="center" justifyContent="center" height="100vh" bg="gray.100">
      <Box bg="white" p={8} borderRadius={8} boxShadow="lg" className="signup-container">
        <h1 className="signup-heading">Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <FormControl isRequired>
            <FormLabel htmlFor="name">Name</FormLabel>
            <Input type="text" id="name" value={formData.name} onChange={handleChange} name="name" />
          </FormControl>
          <FormControl isRequired mt={4}>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input type="email" id="email" value={formData.email} onChange={handleChange} name="email" />
            <Text fontSize="sm" color="gray.500" mt={1}>
              We'll never share your email.
            </Text>
          </FormControl>
          <FormControl isRequired mt={4}>
            <FormLabel htmlFor="phone">Phone</FormLabel>
            <Input type="tel" id="phone" value={formData.phone} onChange={handleChange} name="phone" />
          </FormControl>
          <FormControl isRequired mt={4}>
            <FormLabel htmlFor="password">Password</FormLabel>
            <InputGroup>
              <Input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={formData.password}
                onChange={handleChange}
                name="password"
              />
              <InputRightElement>
                <Button variant="ghost" onClick={handlePasswordVisibility}>
                  {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
            <Text fontSize="sm" color="gray.500" mt={1}>
              Minimum length: 6
            </Text>
          </FormControl>
          <Button type="submit" mt={4} bg="teal.500" color="white" _hover={{ bg: 'teal.600' }} className="signup-button">
            Sign Up
          </Button>
        </form>
        <Text mt={4}>
          Already a user? <Link color="teal.500" href="/login">Login</Link>
        </Text>
      </Box>
    </Flex>
  );
};

export default SignupForm;