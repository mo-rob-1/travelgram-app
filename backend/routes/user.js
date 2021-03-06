const jwt = require("jsonwebtoken");
const bycrypt = require("bcryptjs");
const cloudinary = require("../utils/cloudinary");
const User = require("../models/user");
const upload = require("../utils/multer");
const router = require("express").Router();

router.post("/", upload.single("avatar"), async (req, res) => {
  const { name, email, password, username } = req.body;
  if (!name || !email || !password || !username) {
    res.status(400);
    throw new Error("Please enter all fields");
  }

  const result = await cloudinary.uploader.upload(req.file.path);

  // Check if user exists
  const userExists = await User.findOne({
    email,
    username,
  });
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
    username,
    email,
    password: hashedPassword,
    avatar: result.secure_url,
    cloudinary_id: result.public_id,
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("User could not be created");
  }
});

// login user
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("Please enter all fields");
  }

  const user = await User.findOne({
    email,
  });
  if (!user) {
    res.status(400);
    throw new Error("User does not exist");
  }
  const isMatch = await bycrypt.compare(password, user.password);
  if (!isMatch) {
    res.status(400);
    throw new Error("Incorrect password");
  }
  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    token: generateToken(user._id),
    avatar: user.avatar,
    username: user.username,
  });
});

router.get("/", async (req, res) => {
  try {
    let user = await User.find();
    res.json(user);
  } catch (err) {
    console.log(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    // Find user by id
    let user = await User.findById(req.params.id);
    // Delete image from cloudinary
    await cloudinary.uploader.destroy(user.cloudinary_id);
    // Delete user from db
    await user.remove();
    res.json(user);
  } catch (err) {
    console.log(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    // Find user by id
    let user = await User.findById(req.params.id);
    res.json(user);
  } catch (err) {
    console.log(err);
  }
});

// Generate token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = router;
