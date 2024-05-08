import React from 'react';
import { Box, Heading, Link, Image } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import './404.css'

const Erro404NotFoundPage: React.FC = () => {
  return (
    <Box className="box-container">
      <Box textAlign="center">
        <Heading as="h1" className="heading">Oops! The page you are looking for could not be found.</Heading>
        <Image src="../../../public/Bored.svg" alt="404 error illustration" className="illustration" />
        <Link href="/" className="back-link">
          <ArrowBackIcon className="back-link-icon" />
          Back to Home
        </Link>
      </Box>
    </Box>
  );
};

export default Erro404NotFoundPage;