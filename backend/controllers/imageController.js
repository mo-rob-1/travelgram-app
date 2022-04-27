const asyncHandler = require("express-async-handler");
const cloudinary = require("../utils/cloudinary");
const User = require("../models/userModel");
const Image = require("../models/imageModel");

// @desc  Get all images
// @route GET /api/images
// @access Public
const getAllImages = asyncHandler(async (req, res, next) => {
  const images = await Image.find();
  res.status(200).json({ success: true, data: images });
});

// @desc  Get user images
// @route GET /api/images/:id
// @access Public
const getUserImages = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new ErrorResponse(`User not found with id of ${req.params.id}`, 404));
  }
  const images = await Image.find({ user: req.params.id });
  res.status(200).json({
    success: true,
    count: images.length,
    data: images,
  });
});

// @desc Upload image
// @route POST /api/images
// @access Private
const uploadImage = asyncHandler(async (req, res, next) => {
  if (!req.file) {
    res.status(400);
    throw new Error("Image is required");
  }

  const result = await cloudinary.uploader.upload(req.file.path);

  const image = await Image.create({
    user: req.user.id,
    image: result.secure_url,
    caption: req.body.caption,
    imageLocation: req.body.location,
    cloudinary_id: result.public_id,
  });

  res.status(200).json({
    success: true,
    data: image,
  });
});

// @desc Delete a image
// @route DELETE /api/images/:id
// @access Private
const deleteImage = asyncHandler(async (req, res, next) => {
  const image = await Image.findById(req.params.id);

  if (!image) {
    return next(new ErrorResponse(`Image not found with id of ${req.params.id}`, 404));
  }

  if (image.user.toString() !== req.user.id) {
    return next(new ErrorResponse(`User not authorized to delete image`, 401));
  }

  await cloudinary.uploader.destroy(image.cloudinary_id);
  await image.remove();

  res.status(200).json({
    success: true,
    data: {},
  });
});

module.exports = {
  getAllImages,
  getUserImages,
  uploadImage,
  deleteImage,
};
