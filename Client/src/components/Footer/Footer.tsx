import React from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Link,
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
} from "@chakra-ui/react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import "./Footer.css";

const Footer: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Box className="footer" bg="gray.800" color="white" py={12}>
      <Flex
        className="footer-container"
        maxW="1200px"
        mx="auto"
        flexWrap="wrap"
        justifyContent="space-between"
      >
        <Box mb={6}>
          <Heading as="h3" size="lg" mb={4}>
            Car Rental
          </Heading>
          <Text>Your trusted car rental partner</Text>
        </Box>

        <Box mb={6}>
          <Heading as="h4" size="md" mb={4}>
            Quick Links
          </Heading>
          <Flex direction="column">
            <Link
              href="/admin/login"
              mb={2}
              onClick={() => navigate("/admin/login")}
            >
              Admin Portal
            </Link>
            <Link href="#" mb={2}>
              Rentals
            </Link>
            <Link href="#" mb={2}>
              About Us
            </Link>
            <Link href="#" mb={2}>
              Contact Us
            </Link>
          </Flex>
        </Box>

        <Box mb={6}>
          <Heading as="h4" size="md" mb={4}>
            Legal
          </Heading>
          <Flex direction="column">
            <Link href="#" mb={2}>
              Copyright Notice
            </Link>
            <Link href="#" mb={2}>
              Privacy Policy
            </Link>
            <Link href="#" mb={2}>
              Sitemap
            </Link>
          </Flex>
        </Box>

        <Box mb={6}>
          <Heading as="h4" size="md" mb={4}>
            Contact
          </Heading>
          <Text mb={2}>123 Main Street</Text>
          <Text mb={2}>City, State 12345</Text>
          <Text mb={2}>Phone: (123) 456-7890</Text>
          <Text mb={2}>Email: info@carrental.com</Text>
        </Box>

        <Box mb={6}>
          <Heading as="h4" size="md" mb={4}>
            Follow Us
          </Heading>
          <Flex>
            <IconButton
              aria-label="Facebook"
              icon={<FaFacebook />}
              variant="ghost"
              colorScheme="blue"
              mr={2}
            />
            <IconButton
              aria-label="Twitter"
              icon={<FaTwitter />}
              variant="ghost"
              colorScheme="blue"
              mr={2}
            />
            <IconButton
              aria-label="Instagram"
              icon={<FaInstagram />}
              variant="ghost"
              colorScheme="blue"
              mr={2}
            />
            <IconButton
              aria-label="LinkedIn"
              icon={<FaLinkedin />}
              variant="ghost"
              colorScheme="blue"
            />
          </Flex>
        </Box>

        <Box mb={6}>
          <Heading as="h4" size="md" mb={4}>
            Subscribe to Our Newsletter
          </Heading>
          <InputGroup>
            <Input type="email" placeholder="Enter your email" />
            <InputRightElement>
              <IconButton
                aria-label="Subscribe"
                icon={<MdEmail />}
                colorScheme="blue"
              />
            </InputRightElement>
          </InputGroup>
        </Box>
      </Flex>

      <Flex
        className="footer-bottom"
        justifyContent="space-between"
        alignItems="center"
        maxW="1200px"
        mx="auto"
      >
        <Text>
          &copy; {new Date().getFullYear()} Car Rental. All rights reserved.
        </Text>
        <Text>Developed By Tarun Jawla</Text>
      </Flex>
    </Box>
  );
};

export default Footer;
