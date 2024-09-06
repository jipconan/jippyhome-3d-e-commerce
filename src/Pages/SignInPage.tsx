import * as Comps from "../components";
import { Flex } from "@chakra-ui/react";

// Renders the SignInPage component with centered SignInForm
const SignInPage: React.FC = () => {
  return (
    <Flex justify="center" align="center" bg="whitesmoke" minH="100vh">
      {/* SignInForm component */}
      <Comps.SignInForm />
    </Flex>
  );
};

export default SignInPage;
