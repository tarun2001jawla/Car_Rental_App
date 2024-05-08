// UserNavigation.tsx
import React from 'react';
import { Button, Text} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { LuLogOut } from "react-icons/lu";

import './NavBar.css';

interface UserNavigationProps {
  isLoggedIn: boolean;
  userName: string;
  onLogout: () => void;
}

const UserNavigation: React.FC<UserNavigationProps> = ({ isLoggedIn, userName, onLogout }) => {
  if (isLoggedIn) {
    return (
      <>
        <Text color="white" mr={4} fontWeight="bold">
          Hello, {userName}
        </Text>
        <Button colorScheme="red" variant="solid" onClick={onLogout}>
        <LuLogOut />
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
