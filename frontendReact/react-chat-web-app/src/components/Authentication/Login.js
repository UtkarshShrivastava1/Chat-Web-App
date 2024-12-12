import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { useState } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { ChatState } from "../../Context/ChatProvider";
import { IconButton } from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
const Login = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const toast = useToast();
  const [email, setEmail] = useState(""); // Updated initialization
  const [password, setPassword] = useState(""); // Updated initialization
  const [loading, setLoading] = useState(false);

  const history = useHistory();
  const { setUser } = ChatState();

  const submitHandler = async () => {
    setLoading(true);
    if (!email || !password) {
      toast({
        title: "Please Fill all the Fields", // Corrected typo
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        //"${process.env.REACT_APP_BACKEND_URL}/api/user/login",
        "/api/user/login",
        { email, password },
        config
      );

      toast({
        title: "Login Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setUser(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      history.push("/chats");
    } catch (error) {
      toast({
        title: "Error Occurred!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };

  return (
    <VStack spacing={4} align="stretch">
      <FormControl id="email" isRequired>
        <FormLabel color="blue.500">Email Address</FormLabel>
        <Input
          value={email}
          type="email"
          placeholder="Enter Your Email Address"
          onChange={(e) => setEmail(e.target.value)}
          bg="white"
          border="2px"
          borderColor="gray.200"
          _focus={{ borderColor: "blue.500" }}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel color="blue.500">Password</FormLabel>
        <InputGroup size="md">
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={show ? "text" : "password"}
            placeholder="Enter password"
            bg="white"
            border="2px"
            borderColor="gray.200"
            _focus={{ borderColor: "blue.500" }}
          />
          <InputRightElement width="4.5rem">
            <IconButton
              icon={show ? <ViewOffIcon /> : <ViewIcon />}
              size="sm"
              onClick={handleClick}
              bg="linear-gradient(to right, #2b5876 0%, #4e4376 51%, #2b5876 100%)"
              color="white"
              _hover={{ bg: "blue.600" }}
              aria-label={show ? "Hide" : "Show"}
            />
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button
        colorScheme="blue"
        width="100%"
        onClick={submitHandler}
        isLoading={loading}
        _hover={{ bg: "blue.600" }}
        css={{
          background:
            "linear-gradient(to right, #2b5876 0%, #4e4376 51%, #2b5876 100%)",
          border: "none", // Optionally remove the border
          borderRadius: "md", // Optionally adjust the border radius
          color: "white", // Set text color to white
          fontWeight: "bold", // Optionally set font weight
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Optionally add a subtle shadow
        }}
      >
        Login
      </Button>
    </VStack>
  );
};

export default Login;
