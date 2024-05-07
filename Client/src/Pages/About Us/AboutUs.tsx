import React from 'react';
import { Flex, Box, Heading, Text } from '@chakra-ui/react';
import './AboutUs.css'; // Import CSS file

const AboutUs: React.FC = () => {
  return (
    <Flex direction="column" alignItems="center" justifyContent="center" minHeight="100vh">
      <Box className="about-section" p={8}>
        <Heading as="h1" size="xl" mb={6}>
          About Us
        </Heading>
        <Box className="section">
          <Heading as="h2" size="lg" mb={4}>
            How We Started
          </Heading>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer a sapien euismod, gravida turpis
            fermentum, sollicitudin metus. Morbi nec ligula non lorem accumsan semper.
          </Text>
        </Box>
        <Box className="section">
          <Heading as="h2" size="lg" mb={4}>
            What Makes Us Unique
          </Heading>
          <Text>
            Donec id vestibulum justo, vitae porttitor lectus. Integer a sapien euismod, gravida turpis fermentum,
            sollicitudin metus. Morbi nec ligula non lorem accumsan semper.
          </Text>
        </Box>
        <Box className="section">
          <Heading as="h2" size="lg" mb={4}>
            Our Brand Values and Beliefs
          </Heading>
          <Text>
            Sed sit amet tempus ligula, nec placerat nisl. Nulla facilisi. Nam vel orci sed mauris feugiat tempus ac
            vel dui.
          </Text>
        </Box>
        <Box className="section">
          <Heading as="h2" size="lg" mb={4}>
            Why Choose Us
          </Heading>
          <Text>
            Nam vel orci sed mauris feugiat tempus ac vel dui. Integer a sapien euismod, gravida turpis fermentum,
            sollicitudin metus.
          </Text>
        </Box>
      </Box>
    </Flex>
  );
};

export default AboutUs;
