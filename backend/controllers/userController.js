const jwt = require("jsonwebtoken");
const bycrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const cloudinary = require("../utils/cloudinary");

const User = require("../models/userModel");

// @desc Get all users
// @route GET /api/users
// @access Public
const getAllUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json(users);
});

// @desc  Register new user
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  // Validate request
  const { name, email, password, currentLocation } = req.body;
  if (!name || !email || !password || !currentLocation) {
    res.status(400);
    throw new Error("Please enter all fields");
  }

  const result = await cloudinary.uploader.upload(req.file.path);

  // Check if user exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Hash password
  const salt = await bycrypt.genSalt(10);
  const hashedPassword = await bycrypt.hash(password, salt);

  // Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    avatar: result.secure_url,
    currentLocation,
    cloudinary_id: result.public_id,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      currentLocation: user.currentLocation,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("User could not be created");
  }
});

// @desc  Login/Authenticate a user
// @route POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check for user email
  const user = await User.findOne({ email });

  if (user && (await bycrypt.compare(password, user.password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

// @desc Update user
// @route PUT /api/users/:id
// @access Private
const updateUser = asyncHandler(async (req, res) => {
  const file = req.file;
  if (file) {
    const result = await cloudinary.uploader.upload(file.path);
    req.body.avatar = result.secure_url;
    req.body.cloudinary_id = result.public_id;
  }
  const avatar = req.file.path;
  const result = await cloudinary.uploader.upload(avatar);
  const location = req.body.currentLocation;

  try {
    const user = await User.findByIdAndUpdate(req.user.id, { avatar: result.secure_url, currentLocation: location });
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err,
    });
  }
});

// @desc  Get user data
// @route GET /api/users/me
// @access Private
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  getAllUsers,
  registerUser,
  loginUser,
  updateUser,
  getMe,
};
