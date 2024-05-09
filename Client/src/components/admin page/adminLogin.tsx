import React, { useState } from 'react';
import axios from 'axios';
import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Flex,
  Input,
  Button,
  Heading,
  FormControl,
  FormLabel,
} from '@chakra-ui/react';

const AdminLoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/admin/login', {
        email,
        password,
      });
      console.log('Response from server:', response.data);
      toast({
        title: 'Welcome Admin',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      navigate('/admin/add');
    } catch (error) {
      console.error('Error logging in:', error);
      toast({
        title: 'Login Failed',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex direction="column" align="center" mt={8}>
      <Box bg="white" p={6} rounded="md" w="300px" boxShadow="md">
        <form onSubmit={handleSubmit}>
          <Heading size="md" mb={4}>
            Admin Login
          </Heading>
          <FormControl mb={4}>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </FormControl>
          <Button colorScheme="teal" type="submit" w="100%">
            Login
          </Button>
        </form>
      </Box>
    </Flex>
  );
};

export default AdminLoginForm;