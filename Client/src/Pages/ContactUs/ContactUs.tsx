import React, { useState } from 'react';
import {
  Box,
  Flex,
  Heading,
  Input,
  Textarea,
  Button,
  useToast,
} from '@chakra-ui/react';
import './ContactUs.css';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [query, setQuery] = useState('');
  const toast = useToast();

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check if all fields are filled
    if (!name || !email || !phone || !query) {
      // Show warning toast
      toast({
        title: 'Warning',
        description: 'Please fill in all fields.',
        status: 'warning',
        duration: 5000,
        isClosable: true,
      });
      return; // Exit function
    }

    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Phone:', phone);
    console.log('Query:', query);

    // Show success toast
    toast({
      title: 'Query Submitted',
      description: 'Your query has been received. We will get back to you soon.',
      status: 'success',
      duration: 5000,
      isClosable: true,
    });

    // Clear form fields
    setName('');
    setEmail('');
    setPhone('');
    setQuery('');
  };

  return (
    <Flex className="contact-form-container" justify="center" align="center" minH="100vh">
      <Box
        className="contact-form"
        p={8}
        borderRadius="md"
        boxShadow="lg"
        maxW="md"
        w="full"
      >
        <Heading as="h2" fontSize="2xl" mb={6} textAlign="center">
          Contact Us
        </Heading>
        <form onSubmit={handleSubmit}>
          <Input
            className="form-input"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            mb={4}
          />
          <Input
            className="form-input"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            mb={4}
          />
          <Input
            className="form-input"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            mb={4}
          />
          <Textarea
            className="form-input"
            placeholder="Query"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            mb={4}
            resize="vertical"
          />
          <Button
            className="submit-button"
            type="submit"
            colorScheme="teal"
            size="lg"
            w="full"
            mt={4}
          >
            Submit
          </Button>
        </form>
      </Box>
    </Flex>
  );
};

export default ContactForm;
