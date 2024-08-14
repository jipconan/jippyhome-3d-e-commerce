import * as Comps from "../components";
import { Box } from "@chakra-ui/react";

// Renders the SignInPage component with centered SignInForm
const SignInPage: React.FC = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      h="100vh"
      maxH="100vh"
      bg="whitesmoke"
    >
      {/* SignInForm component */}
      <Comps.SignInForm />
    </Box>
  );
};

export default SignInPage;
