const dummyData = [
  {
    isGroupChat: false,
    users: [
      {
        name: "John Doe",
        email: "john@example.com",
      },
      {
        name: "janedoe",
        email: "janedoe@example.com",
      },
    ],
    id: "617a077e18c25468bc7c4dd4",
    chatName: "John Doe",
  },
  {
    isGroupChat: false,
    users: [
      {
        name: "Alice Smith",
        email: "alice@example.com",
      },
      {
        name: "bobsburgers",
        email: "bobs@example.com",
      },
    ],
    id: "another_unique_id_1",
    chatName: "Alice and Bob",
  },
  {
    isGroupChat: true,
    users: [
      {
        name: "Eve Johnson",
        email: "eve@example.com",
      },
      {
        name: "mallory",
        email: "mallory@example.com",
      },
      {
        name: "charlie",
        email: "charlie@example.com",
      },
    ],
    id: "another_unique_id_2",
    chatName: "Group Chat",
  },
  // Add 7 more chat objects with your dummy data
  // ...
];

module.exports = dummyData;
