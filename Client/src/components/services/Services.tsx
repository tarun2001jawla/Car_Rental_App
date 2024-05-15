import React from 'react';
import { Box, Flex, Heading, Text, Icon, Button } from '@chakra-ui/react';
import { FaCar, FaCalendarAlt, FaTaxi, FaUserTie } from 'react-icons/fa';
import './Services.css';

const Services: React.FC = () => {
  const services = [
    {
      icon: FaCar,
      title: 'Car Rental',
      description: 'Explore the freedom of the open road with our wide range of vehicles. From compact cars to spacious SUVs, we have the perfect ride for your adventure.',
      color: 'green',
    },
    {
      icon: FaCalendarAlt,
      title: 'Long-Term Leasing',
      description: 'Experience the convenience of long-term leasing. Whether for personal or business use, our flexible leasing options provide you with the freedom you need.',
      color: 'yellow',
    },
    {
      icon: FaTaxi,
      title: 'Chauffeur Services',
      description: 'Arrive in style with our professional chauffeur services. Let our experienced drivers take care of the journey, while you relax and enjoy the ride.',
      color: 'blue',
    },
    {
      icon: FaUserTie,
      title: 'Corporate Rental',
      description: 'Streamline your business travel with our corporate rental solutions. We offer tailored packages and exclusive discounts for companies of all sizes.',
      color: 'purple',
    },
    {
      icon: FaCar,
      title: 'Luxury Rentals',
      description: 'Indulge in luxury with our premium range of vehicles. From high-end sedans to luxury SUVs, experience sophistication and comfort on the road.',
      color: 'teal',
    },
    {
      icon: FaCar,
      title: 'Airport Transfers',
      description: 'Enjoy seamless transfers to and from the airport. Our reliable service ensures you reach your destination safely and on time.',
      color: 'orange',
    },
  ];

  return (
    <Box mt={10} >
      <Heading mb={8} fontSize="4xl" fontWeight="bold" textAlign="center">
        Our Services
      </Heading>
      <Flex flexWrap="wrap" justifyContent="center">
        {services.map((service, index) => (
          <Box
            key={index}
            className="service-card"
            bg={`${service.color}.100`}
            p={6}
            m={4}
            borderRadius="md"
            boxShadow="md"
            transition="all 0.3s ease"
            maxW="400px"
            textAlign="center"
          >
            <Flex alignItems="center" mb={4}>
              <Icon as={service.icon} boxSize={8} color={`${service.color}.600`} mr={4} />
              <Heading fontSize="2xl" color={`${service.color}.800`}>{service.title}</Heading>
            </Flex>
            <Text color={`${service.color}.700`}>{service.description}</Text>
          </Box>
        ))}
      </Flex>
      <Flex justifyContent="center" mt={8}>
        <Button
          variant="outline"
          colorScheme="blue"
          _hover={{ bg: 'blue.100' }}
          _focus={{ boxShadow: 'outline' }}
        >
          View More Services
        </Button>
      </Flex>
    </Box>
  );
};

export default Services;
