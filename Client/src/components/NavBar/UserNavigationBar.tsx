import React from 'react';
import { Button, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import './NavBar.css'

interface UserNavigationProps {
  isLoggedIn: boolean;
  userName?: string;
  onLogout: () => void;
}

const UserNavigation: React.FC<UserNavigationProps> = ({
  isLoggedIn,
  userName,
  onLogout,
}) => {
  if (isLoggedIn) {
    return (
      <>
        <Text color="white" mr={4}>
          Welcome, {userName}
        </Text>
        <Button colorScheme="teal" variant="solid" onClick={onLogout}>
          Logout
        </Button>
      </>
    );
  }

  return (
    <>
      <Button as={Link} to="/login" colorScheme="teal" mr={4}>
        Login
      </Button>
      <Button as={Link} to="/signup" colorScheme="teal">
        Sign Up
      </Button>
    </>
  );
};

export default UserNavigation;