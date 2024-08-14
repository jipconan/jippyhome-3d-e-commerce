import { useState, ChangeEvent, FormEvent } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Stack,
  Button,
  Box,
  HStack,
} from "@chakra-ui/react";
import { TicketFormState } from "../../types/propsTypes";
import { sendTicketForm } from "../../service/users";

const TicketForm: React.FC = () => {
  const [form, setForm] = useState<TicketFormState>({
    firstName: "",
    lastName: "",
    email: "",
    orderid: "",
    message: "",
  });

  const [load, setLoad] = useState<boolean>(false);

  const handleFormChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const clearForm = () => {
    setForm({
      firstName: "",
      lastName: "",
      email: "",
      orderid: "",
      message: "",
    });
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (form) {
      try {
        const currentDate = new Date();
        setLoad(true);
        await sendTicketForm({
          ...form,
          date: currentDate,
        });
        clearForm();
        setLoad(false);
      } catch (error) {
        console.error("Error submitting product:", error);
        setLoad(false);
      }
    }
  };

  return (
    <Box w={"100%"}>
      <form onSubmit={handleSubmit}>
        <HStack spacing={4} mb={4}>
          <FormControl id="firstName" isRequired>
            <FormLabel color="black" fontSize="1xl">
              First name
            </FormLabel>
            <Input
              type="text"
              name="firstName"
              value={form.firstName}
              onChange={handleFormChange}
              borderColor="grey"
              size="lg"
            />
          </FormControl>

          <FormControl id="lastName" isRequired>
            <FormLabel color="black" fontSize="1xl">
              Last name
            </FormLabel>
            <Input
              type="text"
              name="lastName"
              value={form.lastName}
              onChange={handleFormChange}
              borderColor="grey"
              size="lg"
            />
          </FormControl>
        </HStack>

        <FormControl id="email" isRequired mb={4}>
          <FormLabel color="black" fontSize="1xl">
            Email
          </FormLabel>
          <Input
            type="email"
            name="email"
            value={form.email}
            onChange={handleFormChange}
            borderColor="grey"
            size="lg"
          />
        </FormControl>

        <FormControl id="orderid" mb={4}>
          <FormLabel color="black" fontSize="1xl">
            {`Order ID (if any)`}
          </FormLabel>
          <Input
            type="text"
            name="orderid"
            value={form.orderid}
            onChange={handleFormChange}
            borderColor="grey"
            size="lg"
          />
        </FormControl>

        <FormControl id="message" isRequired mb={4}>
          <FormLabel color="black" fontSize="1xl">
            Description
          </FormLabel>
          <Textarea
            name="message"
            value={form.message}
            onChange={handleFormChange}
            rows={12}
            borderColor="grey"
          />
        </FormControl>

        <Stack mt={4}>
          <Button
            type="submit"
            isLoading={load}
            loadingText="Submitting"
            bg="gray.500"
            color="gray.100"
            width="full"
            _hover={{ bg: "gray.700", color: "gray.300" }}
          >
            Submit
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default TicketForm;
