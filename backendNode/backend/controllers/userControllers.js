//userController.js
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../config/generateToken");

//@description     Get or Search all users
//@route           GET /api/user?search=
//@access          Private (Requires authentication)
const allUsers = asyncHandler(async (req, res) => {
  const { search } = req.query;
  let users;
  console.log("Search query:", search);
  console.log("Logged-in user ID:", req.user._id);
  if (search) {
    // Case-insensitive search for name or email containing the search keyword
    const searchRegex = new RegExp(search, "i");
    console.log("Searching for users with query:", searchRegex);
    // Exclude the currently logged-in user from the search results
    users = await User.find({
      $or: [
        { name: { $regex: searchRegex } },
        { email: { $regex: searchRegex } },
      ],
      _id: { $ne: req.user._id }, // Exclude the logged-in user
    });
  } else {
    console.log("Fetching all users except logged-in user");
    // If no search keyword provided, return all users except the logged-in user
    users = await User.find({ _id: { $ne: req.user._id } });
  }
  console.log("Search results:", users);
  res.send(users);
});

// Other controller methods...

module.exports = { allUsers /* other methods... */ };

//@description     Register new user
//@route           POST /api/user/
//@access          Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please Enter all the Feilds");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
    pic,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

//@description     Auth the user
//@route           POST /api/users/login
//@access          Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

module.exports = { allUsers, registerUser, authUser };
