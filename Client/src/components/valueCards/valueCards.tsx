// components/ValueCards.tsx
import React from 'react';
import { Box, Flex, Text, Heading, Image, Link ,Button} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCarSide, faSmile,faClock, faShieldAlt, faMoneyBillAlt, faHandHoldingHeart, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import './valueCard.css';

interface ValueCardProps {
  icon: IconDefinition;
  text: string;
  detailText: string;
  color: string;
  image: string;
}

const CustomIcon: React.FC<{ icon: IconDefinition; color: string; size?: string }> = ({ icon, color }) => (
  <FontAwesomeIcon icon={icon} color={color} className="value-card-icon" />
);

const ValueCards: React.FC = () => {
  const values: ValueCardProps[] = [
    { icon: faCarSide, text: 'Trusted Services', detailText: 'Experience reliable and trustworthy car rental services.', color: 'blue', image: '/public/8568188.jpg' },
    { icon: faSmile, text: 'Happy Customers', detailText: 'Join our satisfied customer base and enjoy a seamless experience.', color: 'green', image: '/public/8712667@3x.png' },
    { icon: faShieldAlt, text: 'Secure Transactions', detailText: 'Enjoy peace of mind with our secure payment processing.', color: 'red', image: '/public/3d cartoon style green shield with checkmark icon.jpg' },
    { icon: faClock, text: 'Timely Delivery', detailText: 'Expect prompt and efficient service every time.', color: 'orange', image: '/public/timely.jpg' },
    { icon: faMoneyBillAlt, text: 'Competitive Pricing', detailText: 'Get the best value for your money with our competitive rates.', color: 'purple', image: '/public/pricing.jpg' },
    { icon: faHandHoldingHeart, text: 'Excellent Support', detailText: 'Our friendly support team is always here to assist you.', color: 'teal', image: '/public/support2.jpg' },
  ];

  return (
    <Box mt={10}>
      <Heading mb={8} fontSize="4xl" textAlign="center" className="animated-heading">
        Our Value Propositions
      </Heading>
      <Flex flexWrap="wrap" justifyContent="center">
        {values.map(({ icon, text, detailText, color, image }, index) => (
          <Flex
            key={index}
            bg={`${color}.400`}
            color="white"
            p={6}
            m={4}
            borderRadius="md"
            boxShadow="md"
            transition="all 0.3s ease"
            _hover={{ transform: 'translateY(-5px)', boxShadow: 'lg' }}
            maxW="350px"
            flexDirection="column"
            className="value-card"
          >
            <Box className="image-container">
              <Image src={image} alt={text} objectFit="cover" w="100%" h="200px" borderRadius="md  md 0 0" />
            </Box>
            <Box mt={4} ml={4}>
              <CustomIcon icon={icon} color="white" />
              <Text fontWeight="bold" fontSize="xl" mt={2}>{text}</Text>
              <Text mb={4}>{detailText}</Text>
              <Link href="#" textDecoration="underline" color="white" fontWeight="bold">
                Learn More
              </Link>
            </Box>
          </Flex>
        ))}
      </Flex>
      <Flex justifyContent="center">
        <Button variant="outline" borderStyle={'solid'} colorScheme="blue" mt={5} mb={10} fontWeight="bold" borderRadius= {5} px={10} py={6}>
          View All Services
        </Button>
      </Flex>
    </Box>
  );
};

export default ValueCards;
