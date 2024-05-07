import React, { useState, useEffect } from 'react';
import { Link} from 'react-router-dom';
import {
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Spacer,
  Button,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { getCookie } from '../../utils/cookieUtil';
import UserNavigationBar from './UserNavigationBar';
import './NavBar.css'

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>('');
  //const navigate = useNavigate();

  useEffect(() => {
    const token = getCookie('token');
    if (token) {
      setIsLoggedIn(true);
      setUserName('Tarun Jawla'); 
    }
  }, []);

  const handleLogout = () => {
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    setIsLoggedIn(false);
    setUserName('');
  };

  return (
    <Flex bg="teal.500" p={4} alignItems="center" className="navbar">
      <Flex alignItems="center">
        <Heading as="h1" size="lg" color="white" mr={8}>
          Car Rental
        </Heading>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.300" />
          </InputLeftElement>
          <Input type="text" placeholder="Search..." className="search-input" />
        </InputGroup>
      </Flex>

      <Spacer />

      <Flex alignItems="center">
        <Button as={Link} to="/" colorScheme="teal" variant="ghost" mr={4}>
          Home
        </Button>
        <Button as={Link} to="/rentals" colorScheme="teal" variant="ghost" mr={4}>
          Rentals
        </Button>
        <Button as={Link} to="/about" colorScheme="teal" variant="ghost" mr={4}>
          About Us
        </Button>
        <Button as={Link} to="/contact" colorScheme="teal" variant="ghost" mr={4}>
          Contact Us
        </Button>
      </Flex>

      <Spacer />

      <UserNavigationBar
        isLoggedIn={isLoggedIn}
        userName={userName}
        onLogout={handleLogout}
      />
    </Flex>
  );
};

export default Navbar;