import React, { useEffect, useRef } from 'react';
import { Box, Flex, Heading, Button } from '@chakra-ui/react';
import Typed from 'typed.js';
import './HeroSection.css';
import carIllustration from '../../../public/Work From Home 3.svg';
interface HeroSectionProps {}

const HeroSection: React.FC<HeroSectionProps> = () => {
  const typedRef = useRef<Typed | null>(null);

  useEffect(() => {
    const options = {
      strings: ['Rent a <span class="highlight">Sedan</span>', 'Rent a <span class="highlight">SUV</span>', 'Rent a <span class="highlight">Hatchback</span>'],
      typeSpeed: 100,
      backSpeed: 50,
      loop: true,
    };

    const typed = new Typed(typedRef.current!, options);

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <Flex className="hero-section" alignItems="center" justifyContent="center">
      <Box className="hero-content">
        <Heading as="h1" size="4xl" fontWeight="bold" mb={6} color="white">
          <span ref={(typedRef as unknown) as React.LegacyRef<HTMLSpanElement>} />
        </Heading>
        <Button as="a" href="/signup" className="sign-up-button" colorScheme="teal" size="lg">
          Sign Up
        </Button>
      </Box>
      <Box className="illustration-container">
        <img src={carIllustration} alt="Car Illustration" className="car-illustration" />
      </Box>
    </Flex>
  );
};

export default HeroSection;