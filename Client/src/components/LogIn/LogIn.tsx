import React, { useState, ChangeEvent, FormEvent, MouseEvent } from 'react';
import { Box, FormControl, FormLabel, Input, Button, Flex, InputRightElement, InputGroup,Text,Link, } from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LogIn.css';

interface FormData {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
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
      const response = await axios.post('http://localhost:5000/api/users/login', formData, { withCredentials: true });
      console.log('Response:', response);

      toast('🎉 Login successful!', {
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

      // Setting  the JWT token in a cookie
      document.cookie = `token=${response.data.token}; path=/`;
      console.log(`token=${response.data.token}`);

      setFormData({
        email: '',
        password: '',
      });

      navigate('/'); 
    } catch (err) {
      console.error('Error occurred while logging in:', err);
      toast.error(`Error occurred while logging in: ${err}`, {
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
    <Flex alignItems="center" justifyContent="center" height="100vh" bg="gray.100">
      <Box bg="white" p={8} borderRadius={8} boxShadow="lg" className="login-container">
        <h1 className="login-heading">Login</h1>
        <form onSubmit={handleSubmit}>
          <FormControl isRequired>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input type="email" id="email" value={formData.email} onChange={handleChange} name="email" />
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
          </FormControl>
          <Button type="submit" mt={4} bg="teal.500" color="white" _hover={{ bg: 'teal.600' }} className="login-button">
            Login
          </Button>
        </form>
        <Text mt={4}>
          Don't have an account? <Link color="teal.500" href="/signup">Create one</Link>
        </Text>
      </Box>
    </Flex>
  );
};

export default LoginForm;