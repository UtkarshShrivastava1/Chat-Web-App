const express = require("express");
const {
  registerUser,
  authUser,
  allUsers,
} = require("../controllers/userControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Define route for registering a new user and fetching all users
router
  .route("/")
  .post(registerUser) // POST /api/user for registering a new user
  .get(protect, allUsers); // GET /api/user for fetching all users

// Define route for user login
router.post("/login", authUser); // POST /api/user/login for user login

module.exports = router;
