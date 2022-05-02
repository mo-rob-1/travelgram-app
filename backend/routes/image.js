const jwt = require("jsonwebtoken");
const bycrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const cloudinary = require("../utils/cloudinary");
const User = require("../models/user");
const Image = require("../models/image");
const upload = require("../utils/multer");
const router = require("express").Router();
const { protect } = require("../middleware/authMiddleware");

// upload image
router.post("/", protect, upload.single("image"), async (req, res) => {
  // get user using the ID in the JWT
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(400);
    throw new Error("User does not exist");
  }

  const result = await cloudinary.uploader.upload(req.file.path);

  const image = await Image.create({
    user: req.user.id,
    image: result.secure_url,
    imageLocation: req.body.imageLocation,
    caption: req.body.caption,
    cloudinary_id: result.public_id,
  });

  res.status(200).json({
    success: true,
    data: image,
  });
});

module.exports = router;
