import React from 'react';
import { Box, Flex, Heading, Text, Icon, Image } from '@chakra-ui/react';
import { FaTwitter, FaInstagram, FaPinterest, FaFacebookSquare, FaStar, FaPlus, FaArrowRight } from 'react-icons/fa';
import './CustomerReviews.css';

// Customer reviews data
interface Review {
  name: string;
  username: string;
  profile: string;
  platform: 'twitter' | 'instagram' | 'pinterest' | 'facebook';
  review: string;
  rating: number;
  date: string;
}

const Reviews: Review[] = [
  {
    name: 'Aashish Upadhyay',
    username: '@aashishupadhyay',
    profile: '../../../public/gamer (1).png',
    platform: 'twitter',
    review: 'Their car rental service is top-notch! The process was smooth, and the vehicles were well-maintained. Highly recommended for a hassle-free experience.',
    rating: 5,
    date: 'May 23, 2023',
  },
  {
    name: 'Emily Johnson',
    username: '@emilyj_travel',
    profile: '../../../public/dinosaur.png',
    platform: 'instagram',
    review: 'I rented a car for my road trip, and it was the best decision ever! The staff was friendly, and the rates were affordable. The car was in excellent condition, making my journey even more enjoyable.',
    rating: 4.5,
    date: 'May 20, 2023',
  },
  {
    name: 'David Lee',
    username: '@davidlee_adventurer',
    profile: '../../../public/man (1).png',
    platform: 'pinterest',
    review: 'Renting a car from this company was a breeze. Their website was user-friendly, and the pick-up and drop-off process was seamless. I had a fantastic experience exploring the scenic routes.',
    rating: 4,
    date: 'May 18, 2023',
  },
  {
    name: 'Sarah Thompson',
    username: '@sarahthompson',
    profile: '../../../public/bussiness-man.png',
    platform: 'facebook',
    review: 'Highly recommended for business travelers! I rented a car for a work trip, and the service was exceptional. The car was clean, and the staff was professional and accommodating.',
    rating: 5,
    date: 'May 15, 2023',
  },
  {
    name: 'Michael Brown',
    username: '@michaelbrown_travels',
    profile: '../../../public/woman.png',
    platform: 'instagram',
    review: 'I had an amazing experience renting a car from this company. The rates were competitive, and the car was in excellent condition. I can\'t wait to use their services again on my next adventure!',
    rating:  4.5,
    date: 'May 12, 2023',
  },
];

// Function to get platform icon based on platform type
const getPlatformIcon = (platform: 'twitter' | 'instagram' | 'pinterest' | 'facebook') => {
  switch (platform) {
    case 'twitter':
      return <FaTwitter />;
    case 'instagram':
      return <FaInstagram />;
    case 'pinterest':
      return <FaPinterest />;
    case 'facebook':
      return <FaFacebookSquare />;
    default:
      return null;
  }
};

// CustomerReviews component
const CustomerReviews: React.FC = () => (
  <Box mt={10}>
    {/* Customer quote with arrows */}
    <Flex justifyContent="center" alignItems="center" mb={8} position="relative">
      {/* Left arrow */}
      <Icon as={FaArrowRight} color="blue.500" boxSize={10} position="absolute" left={100} transform="rotate(180deg)" />
      {/* Quote */}
      <Heading fontSize="4xl" fontWeight="extrabold" textAlign="center" color="blue.500" textDecoration="underline">
        "Their car rental service is amazing! <br></br> The staff was friendly,<br></br> and the rates were affordable."
      </Heading>
      {/* Right arrow */}
      <Icon as={FaArrowRight} color="blue.500" boxSize={10} position="absolute" right={100} />
    </Flex>

    {/* Profile icon, name, and username */}
    <Flex justifyContent="center" alignItems="center" mb={8}>
      <Box border="2px solid black" borderRadius="full" overflow="hidden" width="50px" height="50px" mr={4}>
        <Image src="../../../public/boy.png" alt="Profile"  />
      </Box>
      <Box>
        <Text fontSize="lg" fontWeight="bold">John Doe</Text>
        <Text fontSize="md">@johndoe</Text>
      </Box>
    </Flex>

    {/* Reviews section */}
    <Flex flexWrap="wrap" justifyContent="center">
      {Reviews.map((review, index) => (
        <Box
          key={index}
          className="review-card"
          bg={review.platform === 'twitter' ? 'rgba(0,255,0,0.2)' : review.platform === 'instagram' ? 'rgba(0,0,255,0.2)' : review.platform === 'pinterest' ? 'rgba(255,255,0,0.2)' : 'rgba(0,0,0,0.1)'}
          border="2px solid black"
          p={6}
          m={4}
          borderRadius="md"
          boxShadow="md"
          transition="all 0.3s ease"
          _hover={{ transform: 'translateY(-5px)', boxShadow: 'lg' }}
          maxW="500px"
        >
          <Flex alignItems="center" mb={4}>
            <Box
              border="2px solid black"
              borderRadius="full"
              overflow="hidden"
              width="50px"
              height="50px"
              marginRight="1rem"
            >
              <Image src={review.profile} alt={review.name} className="review-profile" borderRadius="full" />
            </Box>
            <Box>
              <Flex alignItems="center">
                <Text fontWeight="bold" mr={2} className="review-name"> 
                  {review.name}
                </Text>
                <Box className="review-platform">
                  {getPlatformIcon(review.platform)}
                  <Text ml={2}>{review.username}</Text>
                </Box>
              </Flex>
            </Box>
          </Flex>
          <Flex alignItems="center" mb={4} className="review-rating">
            {Array.from({ length: review.rating }, (_, i) => (
              <Icon key={i} as={FaStar} color="yellow.500" boxSize={5} />
            ))}
            {Array.from({ length: 5 - review.rating }, (_, i) => (
              <Icon key={i + review.rating} as={FaStar} color="gray.300" boxSize={5} />
            ))}
          </Flex>
          <Text mb={4}>{review.review}</Text>
          <Text fontStyle="italic" className="review-date">{review.date}</Text>
        </Box>
      ))}
    </Flex>

    {/* Read more button */}
    <Flex justifyContent="center">
      <Box
        className="read-more-button"
        bg="black"
        color="white"
        p={4}
        borderRadius="md"
        mt={8}
        _hover={{ opacity: 0.8, cursor: 'pointer', transform: 'scale(1.05)', boxShadow: 'lg' }}
        display="flex"
        alignItems="center"
      >
        <Text mr={2}>Read More</Text> <Icon as={FaPlus} />
      </Box>
    </Flex>
  </Box>
);

export default CustomerReviews;
