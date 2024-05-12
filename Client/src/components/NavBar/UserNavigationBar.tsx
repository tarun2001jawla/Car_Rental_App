import React, { useContext } from 'react';
import { Button,Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { LuLogOut } from 'react-icons/lu';
import { UserContext } from '../../components/contexts/userContext';
import './NavBar.css'

const UserNavigation: React.FC = () => {
  const { user, setUser } = useContext(UserContext);

  const handleLogout = () => {
    setUser(null);
  };

  return user ? (
    <>
    <Text color="white" mr={4} fontWeight="bold">
          Hello, {user.name}
        </Text>
      <Button colorScheme="red" variant="solid" onClick={handleLogout}>
        <LuLogOut />
      </Button>
    </>
  ) : (
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
