import { AddIcon } from "@chakra-ui/icons";
import { Box, Stack, Text } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { useEffect, useState } from "react";
import { getSender, getSenderPic } from "../config/ChatLogics";
import ChatLoading from "./ChatLoading";
import GroupChatModal from "./miscellaneous/GroupChatModal";
import { Button } from "@chakra-ui/react";
import { ChatState } from "../Context/ChatProvider";
import { Avatar } from "@chakra-ui/avatar";

const MyChats = ({ fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState();

  const {
    selectedChat,
    setSelectedChat,
    notification,
    setNotification,
    user,
    chats,
    setChats,
  } = ChatState();
  const toast = useToast();

  const fetchChats = async () => {
    console.log(user._id);

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get("/api/chat", config);
      setChats(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
    // eslint-disable-next-line
  }, [fetchAgain]);

  return (
    <Box
      d={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      p={3}
      bgGradient="linear(to-r, #3A3A3A, #808080)" // Gradient from dark gray to light gray
      w={{ base: "100%", md: "31%" }}
      borderRadius="lg"
      borderWidth="1px"
      boxShadow="0px 4px 6px rgba(0, 0, 0, 0.1)" // Add a subtle shadow
      h="630px" // Adjust the height here
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        fontFamily="Work Sans, sans-serif" // Use Work Sans font with fallback to sans-serif
        d="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
        color="#FFFFFF" // White color for better visibility on black background
      >
        <Text fontWeight="bold">Chat List</Text> {/* Make text bold */}
        <GroupChatModal>
          <Button
            d="flex"
            fontSize={{ base: "17px", md: "10px", lg: "17px" }}
            rightIcon={<AddIcon />}
            bgGradient="linear-gradient(to right, #485563 0%, #29323c  51%, #485563  100%) " // Gradient from dark gray to light gray
            color="#FFFFFF" // White text color
            borderRadius="lg" // Rounded corners
            px={6} // Horizontal padding
            py={3} // Vertical padding
            _hover={{
              // Hover effect
              bg: "#6A5ACD", // Darker purple background color on hover
            }}
            _active={{
              // Active effect
              bg: "#483D8B", // Even darker purple background color on click
            }}
            _focus={{
              // Focus effect
              boxShadow: "outline", // Add outline on focus
            }}
          >
            Create Group Chat
          </Button>
        </GroupChatModal>
      </Box>
      <Box
        d="flex"
        flexDir="column"
        p={3}
        bg="#F8F8F8"
        w="100%"
        h="100%"
        borderRadius="lg"
        overflowY="hidden"
      >
        {chats ? (
          <Stack overflowY="scroll">
            {chats.map((chat) => (
              <Box
                onClick={() => {
                  setSelectedChat(chat);
                  // Remove the chat from the list of notifications
                  setNotification(
                    notification.filter((n) => n.chat._id !== chat._id)
                  );
                }}
                cursor="pointer"
                bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
                color={selectedChat === chat ? "white" : "black"}
                px={3}
                py={2}
                borderRadius="lg"
                key={chat._id}
              >
                <Box d="flex" alignItems="center" position="relative">
                  {/* User's profile picture */}
                  {/* Console logs to check the name and pic */}

                  <Avatar
                    size="sm"
                    cursor="pointer"
                    name={getSender(loggedUser, chat.users).name}
                    src={getSenderPic(loggedUser, chat.users)}
                    mr={2}
                  />

                  {/* Container for user's name */}
                  {!chat.isGroupChat
                    ? getSender(loggedUser, chat.users)
                    : chat.chatName}

                  {/* Notification Badge */}
                  {notification.some((n) => n.chat._id === chat._id) && (
                    <Box
                      w="16px"
                      h="16px"
                      bg="red.500"
                      borderRadius="50%"
                      position="absolute"
                      top="-4px"
                      right="-4px"
                      boxShadow="0 0 10px rgba(255, 0, 0, 0.6)"
                      border={`2px solid rgba(255, 0, 0, 0.8)`}
                      zIndex="1"
                    />
                  )}
                </Box>
              </Box>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
  );
};

export default MyChats;
