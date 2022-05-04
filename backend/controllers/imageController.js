const asyncHandler = require("express-async-handler");
const cloudinary = require("../utils/cloudinary");
const User = require("../models/user");
const Image = require("../models/imageModel");

// @desc Get images
// @route GET /api/images
// @access Private

const getImages = asyncHandler(async (req, res, next) => {
  const images = await Image.find();
  // res.status(200).json({
  //   success: true,
  //   count: images.length,
  //   data: images,
  // });
  res.status(200).json(images);
});

// get user images
const getUserImages = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new ErrorResponse(`User not found with id of ${req.params.id}`, 404));
  }

  const images = await Image.find({ user: req.params.id });

  res.status(200).json(images);
});

const uploadImage = asyncHandler(async (req, res, next) => {
  // get user using the ID in the JWT
  const user = await User.findById(req.user.id);
  if (!user) {
    return next(new ErrorResponse(`User does not exist`, 404));
  }

  const result = await cloudinary.uploader.upload(req.file.path);

  const image = await Image.create({
    user: req.user.id,
    image: result.secure_url,
    imageLocation: req.body.imageLocation,
    caption: req.body.caption,
    cloudinary_id: result.public_id,
    name: req.user.name,
    username: req.user.username,
    avatar: req.user.avatar,
  });

  res.status(200).json({
    success: true,
    data: image,
  });
});

const updateImage = asyncHandler(async (req, res, next) => {
  const image = await Image.findById(req.params.id);

  if (!image) {
    return next(new ErrorResponse(`Image not found with id of ${req.params.id}`, 404));
  }

  if (image.user.toString() !== req.user.id) {
    return next(new ErrorResponse(`User not authorized to update image`, 401));
  }

  const result = await cloudinary.uploader.upload(req.file.path);

  image.avatar = result.secure_url;
  image.cloudinary_id = result.public_id;

  await image.save();

  res.status(200).json({
    success: true,
    data: image,
  });
});

// @desc Delete a image
// @route DELETE /api/images/:id
// @access Private

const deleteImage = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    return next(new ErrorResponse(`User does not exist`, 404));
  }

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
  getImages,
  uploadImage,
  updateImage,
  deleteImage,
  getUserImages,
};
