import React from 'react';
import { Link } from 'react-router-dom';
import { Flex, Button, Spacer,InputGroup, Input, InputLeftElement,Image } from '@chakra-ui/react';

import UserNavigation from './UserNavigationBar';
import { SearchIcon } from '@chakra-ui/icons';
import logo from '../../../public/car.svg';

const Navbar: React.FC = () => {
  

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

      <UserNavigation />
    </Flex>
  );
};

export default Navbar;
