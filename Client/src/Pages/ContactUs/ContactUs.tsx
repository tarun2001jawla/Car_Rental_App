import React, { useState } from 'react';
import { Box, Heading, Flex, FormControl, FormLabel, Input, Textarea, Button, useToast } from '@chakra-ui/react';


const ContactUsPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    query: ''
  });

  const toast = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    toast({
      title: 'Query Submitted',
      description: 'Your query has been submitted successfully!',
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <Flex justify="center" align="center" h="100vh">
      <Box p={8} maxW="md" borderWidth={1} borderRadius={8} boxShadow="lg">
        <Heading mb={6}>Contact Us</Heading>
        <form onSubmit={handleSubmit}>
          <FormControl id="name" isRequired mb={4}>
            <FormLabel>Name</FormLabel>
            <Input type="text" name="name" value={formData.name} onChange={handleChange} />
          </FormControl>
          <FormControl id="email" isRequired mb={4}>
            <FormLabel>Email</FormLabel>
            <Input type="email" name="email" value={formData.email} onChange={handleChange} />
          </FormControl>
          <FormControl id="phone" isRequired mb={4}>
            <FormLabel>Phone Number</FormLabel>
            <Input type="tel" name="phone" value={formData.phone} onChange={handleChange} />
          </FormControl>
          <FormControl id="query" isRequired mb={4}>
            <FormLabel>Query</FormLabel>
            <Textarea name="query" value={formData.query} onChange={handleChange} />
          </FormControl>
          <Button type="submit" colorScheme="teal">Submit Query</Button>
        </form>
      </Box>
    </Flex>
  );
};

export default ContactUsPage;
