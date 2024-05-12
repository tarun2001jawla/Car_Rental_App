import React from 'react';
import { Box, Text, SimpleGrid, Button, Flex, Heading, Image } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import './CarSection.css';

interface CarSectionProps {
  title: string;
  cars: { brand: string; model: string; pricePerDay: number; image: string }[];
}

const CarSection: React.FC<CarSectionProps> = ({ title, cars }) => {
  return (
    <Box py={8}>
      <Heading as="h2" fontSize="3xl" fontWeight="bold" mb={8} textAlign="center">
        {title}
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
        {cars.map((car, index) => (
          <Box
            key={index}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            boxShadow="lg"
            bg="white"
            transition="all 0.3s ease-in-out"
            _hover={{ boxShadow: 'xl', transform: 'translateY(-4px)' }}
          >
            <Image src={car.image} alt={`${car.brand} ${car.model}`} objectFit="cover" h="200px" w="100%" />

            <Box p="6">
              <Flex justify="space-between" alignItems="center">
                <Box>
                  <Text color="teal.500" fontWeight="semibold" letterSpacing="wide" fontSize="sm" textTransform="uppercase">
                    {car.brand}
                  </Text>
                  <Text ml="2" fontSize="sm">
                    {car.model}
                  </Text>
                </Box>
                <Text fontWeight="semibold" fontSize="xl">
                  ${car.pricePerDay}/day
                </Text>
              </Flex>

              <Link to="/rentals">
                <Button colorScheme="teal" mt={4} w="100%" size="md">
                  Know More
                </Button>
              </Link>
            </Box>
          </Box>
        ))}
      </SimpleGrid>
      <Flex justify="center" mt={8}>
        <Link to="/rentals">
          <Button colorScheme="teal" size="lg">
            View All
          </Button>
        </Link>
      </Flex>
    </Box>
  );
};

export default CarSection;