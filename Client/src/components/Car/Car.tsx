import React,{useState} from 'react';
import { Card, Image, Text, Button, Heading, Box, Stack, StackDivider } from '@chakra-ui/react';
import './Car.css'; 
import CarReservationConfirmForm from '../ReservationConfirmForm/ReservationForm';

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
}

interface CarProps {
  car: CarData;
}

const Car: React.FC<CarProps> = ({ car }) => {
  const { make, Car_model, year, mileage, fuelType, transmission, seats, pricePerDay, CoverImageURL } = car;
  const [showForm, setShowForm] = useState(false);

  const handleButtonClick = () => {
    setShowForm(true);
  };

  return (
    <Card boxShadow="lg" borderRadius="md" className="car-card">
      <Image src={CoverImageURL} alt={`${make} ${Car_model}`} className="car-image" />

      <Box p="4" className="car-info">
        <Heading as="h2" size="md" mb="2" className="car-title">{make} {Car_model} - {year}</Heading>

        <Stack divider={<StackDivider />} spacing="4">
          <Box>
            <Text className="car-detail-heading">Mileage</Text>
            <Text className="car-detail-value">{mileage} km</Text>
          </Box>

          <Box>
            <Text className="car-detail-heading">Fuel Type</Text>
            <Text className="car-detail-value">{fuelType}</Text>
          </Box>

          <Box>
            <Text className="car-detail-heading">Transmission</Text>
            <Text className="car-detail-value">{transmission}</Text>
          </Box>

          <Box>
            <Text className="car-detail-heading">Seats</Text>
            <Text className="car-detail-value">{seats}</Text>
          </Box>

          <Box>
            <Text className="car-detail-heading">Price per Day</Text>
            <Text className="car-detail-value">${pricePerDay.toFixed(2)}</Text>
          </Box>
        </Stack>

        <Button colorScheme="teal" mt="4" className="car-rent-button" onClick={handleButtonClick}>Rent</Button>
        {showForm && (
          <CarReservationConfirmForm
            isOpen={showForm}
            onClose={() => setShowForm(false)}
            onConfirm={(formData) => {
              console.log("Form Data is:" ,formData)
            }}
            carDetails={car}
          />
        )}
      </Box>
    </Card>
  );
};

export default Car;
