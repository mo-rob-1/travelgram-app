const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    // avatar: {
    //   type: String,
    // },
    image: {
      type: String,
      required: [true, "Image is required"],
    },
    caption: {
      type: String,
      required: [true, "Caption is required"],
    },
    imageLocation: {
      type: String,
      required: [true, "Image location is required"],
    },
    cloudinary_id: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Image", imageSchema);
