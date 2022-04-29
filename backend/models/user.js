const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
    },
    avatar: {
      type: String,
    },
    email: {
      type: String,
      required: [true, "Please add a email"],
      unique: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
      required: true,
    },
    cloudinary_id: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", UserSchema);
