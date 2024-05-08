import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useToast, Spinner, Box, Text, Image } from '@chakra-ui/react';
import { reserveCar } from '../../utils/OrderService';
import ConfirmImage from '../../../public/Meditation--Streamline-Lagos.svg'; 
import './Confirmation.css'

const ConfirmationPage: React.FC = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  const orderData = location.state?.orderData;

  const handleConfirmOrder = async () => {
    setIsLoading(true);
    try {
      await reserveCar(orderData);
      toast({
        title: 'Success',
        description: 'Booking confirmed!',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      navigate('/');
    } catch (error) {
      console.error('Error confirming order:', error);
      toast({
        title: 'Error',
        description: 'Failed to confirm booking. Please try again later.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh">
      <Image src={ConfirmImage} alt="Car" boxSize="300px" mb={8} />
      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        Click the link to confirm your booking
      </Text>
      <Link to={''} onClick={handleConfirmOrder} color="teal.500">
        {isLoading ? 'Confirming...' : 'Confirm Booking'}
      </Link>
      {isLoading && <Spinner ml={4} />}
    </Box>
  );
};

export default ConfirmationPage;