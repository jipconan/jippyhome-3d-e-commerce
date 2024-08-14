import * as Comps from "../components";
import { Box } from "@chakra-ui/react";

// Renders the SignUpPage component with centered SignUpForm
const SignUpPage: React.FC = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      h="100vh"
      maxH="100vh"
      bg="whitesmoke"
    >
      {/* SignUpForm component */}
      <Comps.SignUpForm />
    </Box>
  );
};

export default SignUpPage;
