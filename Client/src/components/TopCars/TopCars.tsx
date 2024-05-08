import React from 'react';
import { Box, Image, Text, Button } from '@chakra-ui/react';

interface CarCardProps {
  car: { brand: string; model: string; pricePerDay: number; image: string };
}

const CarCard: React.FC<CarCardProps> = ({ car }) => {
  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" boxShadow="lg">
      <Image src={car.image} alt={`${car.brand} ${car.model}`} />

      <Box p="6">
        <Box display= "flex" alignItems="baseline">
          <Text color="teal.500" fontWeight="semibold" letterSpacing="wide" fontSize="sm" textTransform="uppercase">
            {car.brand}
          </Text>
          <Text ml="2" fontSize="sm">
            {car.model}
          </Text>
        </Box>

        <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
          {`$${car.pricePerDay}/day`}
        </Box>

        <Button as="a" href="/rentals" colorScheme="teal" mt={4} size="sm">
          Know More
        </Button>
      </Box>
    </Box>
  );
};

export default CarCard;
