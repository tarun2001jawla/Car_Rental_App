// GitHubAuthButton.tsx
import React from 'react';
import { Button, Box } from '@chakra-ui/react';
import { FaGithub } from 'react-icons/fa';
import './LogIn.css';

const GitHubAuthButton: React.FC = () => {
  const handleGitHubAuth = () => {
    window.location.href = 'http://localhost:5000/auth/github';
  };

  return (
    <Button ml={5} onClick={handleGitHubAuth} colorScheme="green" leftIcon={<Box as={FaGithub} />}>
      Sign in with GitHub
    </Button>
  );
};

export default GitHubAuthButton;