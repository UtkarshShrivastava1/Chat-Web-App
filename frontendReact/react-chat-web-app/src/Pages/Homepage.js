import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useHistory } from "react-router";
import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";
function Homepage() {
  const history = useHistory();
  const gradientBg = {
    backgroundImage: "linear-gradient(90deg, #f0f8ff 50%, #f5f5dc 100%)",
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if (user) history.push("/chats");
  }, [history]);

  return (
    <Container maxW="xl" centerContent>
      <Box
        d="flex"
        justifyContent="center"
        p={3}
        bgGradient="linear-gradient(to right, #16222A 0%, #3A6073  51%, #16222A  100%)  " // Gradient from dark gray to light gray
        w="200%"
        m="40px 0 30px 0"
        borderRadius="lg"
        borderWidth="2px"
        borderColor="#4facfe"
        boxShadow="0px 4px 6px rgba(0, 0, 0, 0.1)"
      >
        <Text
          fontSize="3xl" // Increase font size for emphasis
          fontFamily="Arial, sans-serif" // Use Arial font with fallback to sans-serif
          fontWeight="bold" // Make the text bold for emphasis
          color="#f0f0f0" // Light gray color
          letterSpacing="1px" // Add slight letter spacing for better readability
          textShadow="2px 2px 4px rgba(0, 0, 0, 0.2)" // Add a subtle text shadow for depth
        >
          React Chat Web Application
        </Text>
      </Box>

      <Box
        w="120%"
        p={4}
        borderRadius="lg"
        borderWidth="10px"
        style={gradientBg}
      >
        {" "}
        <Tabs isFitted variant="soft-rounded">
          <TabList mb="1em" px={4} fontSize={{ base: "sm", md: "md" }}>
            <Tab>Login</Tab>
            <Tab>Sign Up</Tab>
          </TabList>
          <TabPanels h="auto">
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
}

export default Homepage;
