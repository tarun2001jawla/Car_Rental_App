// GoogleAuthButton.tsx
import React from 'react';
import { Button, Box } from '@chakra-ui/react';
import { FcGoogle } from 'react-icons/fc';
import './LogIn.css';

const GoogleAuthButton: React.FC = () => {
  const handleGoogleAuth = () => {
    window.location.href = 'http://localhost:5000/auth/google';
  };

  return (
    <Button onClick={handleGoogleAuth} colorScheme="blue" leftIcon={<Box as={FcGoogle} />}>
      Sign in with Google
    </Button>
  );
};

export default GoogleAuthButton;