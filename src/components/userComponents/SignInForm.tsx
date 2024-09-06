import React, { useState, FormEvent } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Image,
  VStack,
  Text,
} from "@chakra-ui/react";
import { hashDataWithSaltRounds, storeToken } from "../../utils/security";
import { getSigninDetails, signinUser } from "../../service/users";
import logo from "/media/jippyhomelogocolored.png";
import "./index.css";
import { SignInDetailsResponse } from "../../types/autheticationTypes";

const SignInForm: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const formData = { email, password };

      const signinDetails = await getSigninDetails(formData.email);

      const hashedPassword = hashDataWithSaltRounds(
        formData.password,
        signinDetails.salt,
        signinDetails.iterations
      );
      formData.password = hashedPassword;

      const response: SignInDetailsResponse = await signinUser(formData);

      if (typeof response.data === "string") {
        const token = response.data;
        storeToken(token);
        window.location.href = `/`;
      }
    } catch (error) {
      if (error instanceof Error) {
        // Use error.message to determine the type of error
        if (error.message) {
          setEmailError("Incorrect email or password");
          setPasswordError("");
        } else {
          setEmailError("An unexpected error occurred. Please try again.");
          setPasswordError("");
        }
      }
    }
  };

  return (
    <Box
      h="100%"
      w={{ base: "85%", md: "50%", lg: "35%" }}
      p={12}
      borderRadius="lg"
      boxShadow="dark-lg"
      className="font-montserrat"
    >
      <Box
        mx="auto"
        mb={2}
        boxSize="120px"
        border="solid 1px lightgray"
        boxShadow="md"
      >
        <Link to="/">
          <Image src={logo} border="solid 3px white" />
        </Link>
      </Box>

      <Text fontSize="lg" fontWeight="bold" textAlign="start" mb={2}>
        Sign In
      </Text>
      <Text fontSize="sm" textAlign="start" mb={8}>
        Enter your email and password to login.
      </Text>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl isInvalid={!!emailError} isRequired>
            <FormLabel htmlFor="email" fontSize="sm">
              Email
            </FormLabel>
            <Input
              type="email"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError("");
              }}
            />
            <FormErrorMessage>{emailError}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!passwordError} isRequired>
            <FormLabel htmlFor="password" fontSize="sm">
              Password
            </FormLabel>
            <Input
              type="password"
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError("");
              }}
            />
            <FormErrorMessage>{passwordError}</FormErrorMessage>
          </FormControl>

          <Text fontSize="sm">
            Don't have an account?{" "}
            <Link to="/signup" style={{ color: "blue" }}>
              Sign Up
            </Link>
            .
          </Text>

          <Button
            type="submit"
            bg="gray.500"
            color="gray.100"
            width="full"
            _hover={{ bg: "gray.700", color: "gray.300" }}
          >
            Continue
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default SignInForm;
