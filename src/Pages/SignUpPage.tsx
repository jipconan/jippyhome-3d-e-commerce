import * as Comps from "../components";
import { Flex } from "@chakra-ui/react";

// Renders the SignUpPage component with centered SignUpForm
const SignUpPage: React.FC = () => {
  return (
    <Flex justify="center" align="center" bg="whitesmoke" minH="100vh">
      {/* SignUpForm component */}
      <Comps.SignUpForm />
    </Flex>
  );
};

export default SignUpPage;
