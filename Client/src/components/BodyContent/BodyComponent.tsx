import React from 'react';
import { Box } from '@chakra-ui/react';
import CarSection from '../TopCars/CarSection';

const BodyComponent: React.FC = () => {
  
  const sedans = [
    { brand: 'Toyota', model: 'Camry', pricePerDay: 50, image: '../../../public/2302-Honda-Accord-Touring-Hybrid-Trim.jpg' },
    { brand: 'Honda', model: 'Accord', pricePerDay: 55, image: '../../../public/2302-Honda-Accord-Touring-Hybrid-Trim.jpg' },
    { brand: 'Honda', model: 'Accord', pricePerDay: 55, image: '../../../public/2302-Honda-Accord-Touring-Hybrid-Trim.jpg' },
   
  ];

  const suvs = [
    { brand: 'Jeep', model: 'Wrangler', pricePerDay: 70, image: '../../../public/jeep.webp' },
    { brand: 'Toyota', model: 'Rav4', pricePerDay: 65, image: '../../../public/jeep.webp' },
    { brand: 'Honda', model: 'Accord', pricePerDay: 55, image: '../../../public/jeep.webp' },
    
  ];

  const luxuryCars = [
    { brand: 'Mercedes-Benz', model: 'S-Class', pricePerDay: 150, image: '../../../public/bmw.png' },
    { brand: 'BMW', model: '7 Series', pricePerDay: 140, image:  '../../../public/bmw.png' },
    { brand: 'Honda', model: 'Accord', pricePerDay: 55, image:  '../../../public/bmw.png'},
    
  ];

  return (
    <Box>
      <CarSection title="Top Sedans in Your Area" cars={sedans} />
      <CarSection title="Top SUVs" cars={suvs} />
      <CarSection title="Top Luxury Cars" cars={luxuryCars} />
    </Box>
  );
};

export default BodyComponent;
