import React from 'react';
import { Box, Flex, Heading, Text, UnorderedList, ListItem,Button } from '@chakra-ui/react';
import './AboutUs.css';
import { Link } from 'react-router-dom';

const AboutUs = () => {
  return (
    <Box className="about-container">
      <Flex className="hero-section-about" alignItems="center" justifyContent="center" minH="80vh">
        <Heading as="h1" size="4xl" color="white" textAlign="center">
          About Our Company
        </Heading>
      </Flex>

      <Flex className="content-section" alignItems="center" justifyContent="center" flexWrap="wrap" py={20}>
        <Box className="info-block green" p={8} borderRadius="md" maxW="md" m={4} _hover={{ transform: 'translateY(-8px)' }}>
          <Heading as="h2" size="xl" color="white" mb={4}>
            Our Mission
          </Heading>
          <Text color="white" fontSize="lg">
            We strive to provide exceptional car rental services, offering a wide range of vehicles to cater to diverse needs. Our mission is to make your journey convenient, affordable, and enjoyable.
          </Text>
        </Box>

        <Box className="info-block blue" p={8} borderRadius="md" maxW="md" m={4} _hover={{ transform: 'translateY(-8px)' }}>
          <Heading as="h2" size="xl" color="white" mb={4}>
            Our Values
          </Heading>
          <UnorderedList color="white" fontSize="lg" spacing={2}>
            <ListItem>Customer satisfaction</ListItem>
            <ListItem>Transparency</ListItem>
            <ListItem>Sustainability</ListItem>
            <ListItem>Innovative solutions</ListItem>
          </UnorderedList>
        </Box>

        <Box className="info-block orange" p={8} borderRadius="md" maxW="md" m={4} _hover={{ transform: 'translateY(-8px)' }}>
          <Heading as="h2" size="xl" color="white" mb={4}>
            Our Team
          </Heading>
          <Text color="white" fontSize="lg">
            Our dedicated team of professionals is committed to providing exceptional service. We continuously strive to enhance our offerings and exceed your expectations.
          </Text>
        </Box>

        <Box className="info-block purple" p={8} borderRadius="md" maxW="md" m={4} _hover={{ transform: 'translateY(-8px)' }}>
          <Heading as="h2" size="xl" color="white" mb={4}>
            Our Promise
          </Heading>
          <Text color="white" fontSize="lg">
            We promise to always prioritize your needs and deliver a hassle-free experience. Your satisfaction is our ultimate goal.
          </Text>
        </Box>

        <Box className="info-block teal" p={8} borderRadius="md" maxW="md" m={4} _hover={{ transform: 'translateY(-8px)' }}>
          <Heading as="h2" size="xl" color="white" mb={4}>
            Our History
          </Heading>
          <Text color="white" fontSize="lg">
            Founded in 2005, our company has been a trusted name in the car rental industry. We've grown from a small local business to a nationwide provider, thanks to our commitment to excellence.
          </Text>
        </Box>

        <Box className="info-block yellow" p={8} borderRadius="md" maxW="md" m={4} _hover={{ transform: 'translateY(-8px)' }}>
          <Heading as="h2" size="xl" color="white" mb={4}>
            Our Future
          </Heading>
          <Text color="white" fontSize="lg">
            As we look to the future, we remain dedicated to staying at the forefront of innovation and adapting to the ever-changing needs of our customers.
          </Text>
        </Box>
      </Flex>
      <Flex className="contact-button-container" justifyContent="center" mb={12}>
        <Link to="/query">
          <Button
            className="contact-button"
            colorScheme="rainbow"
            fontSize="lg"
            fontWeight="bold"
            px={8}
            py={6}
            borderRadius="md"
            _hover={{ transform: 'translateY(-4px)' }}
          >
            Contact Us
          </Button>
        </Link>
      </Flex>
    </Box>
  );
};

export default AboutUs;