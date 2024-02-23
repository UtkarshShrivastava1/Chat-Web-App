import { Avatar } from "@chakra-ui/avatar";
import { Box, Text } from "@chakra-ui/layout";

const UserListItem = ({ user, handleFunction }) => {
  // Log the user object for debugging
  console.log("User object:", user);

  return (
    <Box
      onClick={handleFunction}
      cursor="pointer"
      bgGradient="linear(to-r, #3A3A3A, #808080)" // Dark metallic gradient
      _hover={{
        background: "#38B2AC", // Lighter color on hover
        color: "white",
      }}
      w="100%"
      d="flex"
      alignItems="center"
      color="white"
      px={3}
      py={2}
      mb={2}
      borderRadius="lg"
    >
      <Avatar
        mr={2}
        size="sm"
        cursor="pointer"
        name={user.name}
        src={user.pic}
      />
      <Box>
        <Text fontWeight="bold">{user.name}</Text> {/* Bold name */}{" "}
        <Text fontSize="xs">
          <b>Email: </b>
          {user.email}
        </Text>
      </Box>
    </Box>
  );
};

export default UserListItem;
