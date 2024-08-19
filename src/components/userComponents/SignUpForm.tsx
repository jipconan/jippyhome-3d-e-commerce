import React, { useState, FormEvent, ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Input,
  Image,
  VStack,
  HStack,
  Text,
  FormErrorMessage,
} from "@chakra-ui/react";
import { hashData } from "../../utils/security";
import { signUp } from "../../service/users";
import { User } from "../../types/autheticationTypes";
import logo from "/media/jippyhomelogocolored.png";

const SignUpForm: React.FC = () => {
  const [formState, setFormState] = useState<Partial<User>>({});
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  function hashPassword() {
    const currForm = formState;
    if (currForm.password) {
      const hash = hashData(currForm.password);
      currForm.password = hash.hash;
      currForm.salt = hash.salt;
      currForm.iterations = hash.iterations;
    }
  }

  const handleSubmit = async (evt: FormEvent) => {
    evt.preventDefault();

    // Check if passwords and confirm password are filled
    if (!formState.password || !formState.confirm) {
      setError("Both password inputs are required");
      return;
    }

    // Check if passwords match
    if (formState.password !== formState.confirm) {
      setError("Passwords must match");
      return;
    }

    // Clear previous errors if any
    setError(null);
    hashPassword();
    const formData = { ...formState };
    delete formData.confirm;

    try {
      await signUp(formData as User);
      navigate("/");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Box
      maxW="40vw"
      maxH="80vh"
      w="50vw"
      h="65vh"
      p={6}
      borderRadius="lg"
      boxShadow="lg"
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
        Create an Account
      </Text>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <HStack spacing={4} w="full">
            <FormControl isRequired>
              <FormLabel htmlFor="firstName" fontSize="sm">
                First Name
              </FormLabel>
              <Input
                type="text"
                id="firstName"
                name="firstName"
                onChange={handleChange}
              />
              <FormErrorMessage>First name is required</FormErrorMessage>
            </FormControl>
            <FormControl isRequired>
              <FormLabel htmlFor="lastName" fontSize="sm">
                Last Name
              </FormLabel>
              <Input
                type="text"
                id="lastName"
                name="lastName"
                onChange={handleChange}
              />
              <FormErrorMessage>Last name is required</FormErrorMessage>
            </FormControl>
          </HStack>

          <FormControl isRequired>
            <FormLabel htmlFor="email" fontSize="sm">
              Email
            </FormLabel>
            <Input
              type="email"
              id="email"
              name="email"
              onChange={handleChange}
            />
            <FormErrorMessage>Email is required</FormErrorMessage>
          </FormControl>

          <HStack spacing={4} w="full">
            <FormControl isRequired isInvalid={!!error}>
              <FormLabel htmlFor="password" fontSize="sm">
                Password
              </FormLabel>
              <Input
                type="password"
                id="password"
                name="password"
                onChange={handleChange}
              />
              {error && <FormErrorMessage>{error}</FormErrorMessage>}
            </FormControl>
            <FormControl isRequired isInvalid={!!error}>
              <FormLabel htmlFor="confirm" fontSize="sm">
                Confirm Password
              </FormLabel>
              <Input
                type="password"
                id="confirm"
                name="confirm"
                onChange={handleChange}
              />
              {error && <FormErrorMessage>{error}</FormErrorMessage>}
            </FormControl>
          </HStack>

          <FormControl isRequired display="flex" alignItems="center">
            <Checkbox id="agree" name="agree" onChange={handleChange} />
            <Box display="flex" alignItems="center" ml={2}>
              <FormLabel htmlFor="agree" mb={0} fontSize="sm">
                I have read and acknowledge JippyHome’s{" "}
                <Text
                  as="span"
                  fontSize="sm"
                  style={{ textDecoration: "underline" }}
                  _hover={{ cursor: "pointer" }}
                >
                  Privacy Policy
                </Text>
              </FormLabel>
            </Box>
          </FormControl>

          <Text fontSize="sm">
            Already have an account?{" "}
            <Link to="/signin" style={{ color: "blue" }}>
              Sign in
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
            Sign Up
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default SignUpForm;
