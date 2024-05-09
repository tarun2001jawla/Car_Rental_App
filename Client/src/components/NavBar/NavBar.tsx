/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Flex, Input, InputGroup, InputLeftElement, Spacer, Button, Image } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { getCookie, parseJwt } from '../../utils/jwtDecode';
import UserNavigation from './UserNavigationBar';
import logo from '../../../public/car.svg';
import './NavBar.css';

const Navbar: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>('');

  useEffect(() => {
    const token = getCookie('token');
    if (token) {
      setIsLoggedIn(true);
      const decodedToken: any = parseJwt(token); 
      console.log("Decoded Token is:",decodedToken);
      if (decodedToken) {
        setUserName(decodedToken.name); 
      }
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
        <Image src={logo} alt="Logo" boxSize="50px" mr={4} />
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
        <Button as={Link} to="/query" colorScheme="teal" variant="ghost" mr={4}>
          Contact Us
        </Button>
      </Flex>

      <Spacer />

      <UserNavigation isLoggedIn={isLoggedIn} userName={userName} onLogout={handleLogout} />
    </Flex>
  );
};

export default Navbar;
