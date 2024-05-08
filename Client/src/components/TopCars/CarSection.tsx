import React from 'react';
import { Box, Text, SimpleGrid, Button } from '@chakra-ui/react';
import CarCard from './TopCars';
import './CarSection.css'

interface CarSectionProps {
  title: string;
  cars: { brand: string; model: string; pricePerDay: number; image: string }[];
}

const CarSection: React.FC<CarSectionProps> = ({ title, cars }) => {
  return (
    <Box py={8}>
      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        {title}
      </Text>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
        {cars.map((car, index) => (
          <CarCard key={index} car={car} />
        ))}
      </SimpleGrid>
      <Button as="a" href="/rentals" colorScheme="teal" mt={8}>
        View All
      </Button>
    </Box>
  );
};

export default CarSection;
