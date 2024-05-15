import React from 'react';
import { Box, Flex, Heading, Text, Button, Icon, Image } from '@chakra-ui/react';
import { FaArrowRight } from 'react-icons/fa';
import './FaqSection.css';

interface FAQItem {
  title: string;
  description: string;
  image: string;
  color: string;
}

const FAQItems: FAQItem[] = [
  {
    title: 'Billing',
    description: 'Learn about our billing process and payment options.',
    image: '/Billing.svg',
    color: 'yellow.100',
  },
  {
    title: 'Account',
    description: 'Find information on how to manage and access your account.',
    image: '/account.svg',
    color: 'green.100',
  },
  {
    title: 'Guides',
    description: 'Explore our helpful guides and tutorials.',
    image: '/guide.svg',
    color: 'blue.100',
  },
  {
    title: 'Rental',
    description: 'Discover our rental services and how to book a vehicle.',
    image: '/rental.svg',
    color: 'teal.100',
  },
];

const FAQ: React.FC = () => (
  <Box mt={10}>
    <Heading mb={8} fontSize="4xl" fontWeight="bold" textAlign="center">
      How can we help?
    </Heading>
    <Flex flexWrap="wrap" justifyContent="center">
      {FAQItems.map((item, index) => (
        <Box
          key={index}
          className="faq-card"
          bg={item.color}
          p={6}
          m={4}
          borderRadius="md"
          boxShadow="md"
          transition="all 0.3s ease"
          maxW="300px"
          textAlign="center"
        >
          <Image src={item.image} alt={item.title} boxSize="100px" mx="auto" />
          <Heading fontSize="2xl" mt={4} mb={2}>
            {item.title}
          </Heading>
          <Text mb={4}>{item.description}</Text>
          <Button
            colorScheme="blue"
            variant="outline"
            _hover={{ bg: 'blue.100' }}
            _focus={{ boxShadow: 'outline' }}
          >
            Learn More <Icon as={FaArrowRight} ml={2} />
          </Button>
        </Box>
      ))}
    </Flex>
  </Box>
);

export default FAQ;
