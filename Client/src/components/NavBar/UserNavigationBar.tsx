import React from 'react';
import { Button, Text,IconButton} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa'; // Import the cart icon
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
        <IconButton
              aria-label="Cart"
              icon={<FaShoppingCart />}
              variant="ghost"
              colorScheme="blue"
              mr={2}
            />
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
     <IconButton
              aria-label="Cart"
              icon={<FaShoppingCart />}
              variant="ghost"
              colorScheme="blue"
              mr={2}
            />
    </>
  );
};

export default UserNavigation;
