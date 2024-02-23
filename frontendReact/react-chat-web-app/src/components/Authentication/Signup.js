import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router";
import { IconButton } from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
const Signup = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const toast = useToast();
  const history = useHistory();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [password, setPassword] = useState("");
  const [pic, setPic] = useState("");
  const [picLoading, setPicLoading] = useState(false);

  const submitHandler = async () => {
    setPicLoading(true);
    if (!name || !email || !password || !confirmpassword) {
      toast({
        title: "Please Fill all the Fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
      return;
    }
    if (password !== confirmpassword) {
      toast({
        title: "Passwords Do Not Match",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/user",
        {
          name,
          email,
          password,
          pic,
        },
        config
      );

      toast({
        title: "Registration Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setPicLoading(false);
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
      setPicLoading(false);
    }
  };

  const postDetails = (pics) => {
    setPicLoading(true);
    if (!pics) {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      const uploadPreset = "ld1ennkc";
      const cloudName = "dpd7aw7dv";
      const cloudinaryUploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
      data.append("file", pics);
      data.append("upload_preset", uploadPreset);
      data.append("cloud_name", cloudName);

      fetch(cloudinaryUploadUrl, {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          setPicLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setPicLoading(false);
        });
    } else {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
      return;
    }
  };

  return (
    <VStack spacing="5px" align="stretch">
      <FormControl id="first-name" isRequired>
        <FormLabel color="blue.500">Name</FormLabel>
        <Input
          placeholder="Enter Your Name"
          onChange={(e) => setName(e.target.value)}
          bg="white"
          border="2px"
          borderColor="gray.200"
          _focus={{ borderColor: "blue.500" }}
        />
      </FormControl>
      <FormControl id="email" isRequired>
        <FormLabel color="blue.500">Email Address</FormLabel>
        <Input
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
            type={show ? "text" : "password"}
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
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
      <FormControl id="password" isRequired>
        <FormLabel color="blue.500">Confirm Password</FormLabel>
        <InputGroup size="md">
          <Input
            type={show ? "text" : "password"}
            placeholder="Confirm password"
            onChange={(e) => setConfirmpassword(e.target.value)}
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
      <FormControl id="pic">
        <FormLabel color="blue.500">Upload your Picture</FormLabel>
        <Input
          type="file"
          p={1.5}
          accept="image/*"
          onChange={(e) => postDetails(e.target.files[0])}
          bg="white"
          border="2px"
          borderColor="gray.200"
          _focus={{ borderColor: "blue.500" }}
        />
      </FormControl>
      <Button
        colorScheme="blue"
        width="100%"
        onClick={submitHandler}
        isLoading={picLoading}
        _hover={{ bg: "blue.600" }}
        style={{
          backgroundImage:
            "linear-gradient(to right, #2b5876 0%, #4e4376 51%, #2b5876 100%)",
          color: "white", // Optionally, you can set text color
          border: "none", // Optionally, you can remove border
        }}
      >
        Sign Up
      </Button>
    </VStack>
  );
};

export default Signup;
