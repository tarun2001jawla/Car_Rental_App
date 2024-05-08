// RentalPage.tsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Spinner, Center } from '@chakra-ui/react';
import Car from '../../components/Car/Car';

interface CarData {
  _id: string;
  make: string;
  Car_model: string;
  year: number;
  mileage: number;
  fuelType: string;
  transmission: string;
  seats: number;
  pricePerDay: number;
  licensePlate: string;
  CoverImageURL: string;
  availability: number; 
}

const RentalPage: React.FC = () => {
  const [cars, setCars] = useState<CarData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get<CarData[]>('http://localhost:5000/api/cars');
        const filteredCars = response.data.filter((car) => car.availability > 0);
        setCars(filteredCars);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching car data:', error);
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  return (
    <div>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}></h1>
      {loading ? (
        <Center>
          <Spinner size="xl" color="teal" />
        </Center>
      ) : (
        <Grid templateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={6} p={4}>
          {cars.map((car) => (
            <Car key={car._id} car={car} />
          ))}
        </Grid>
      )}
    </div>
  );
};

export default RentalPage;
