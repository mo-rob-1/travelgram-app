const express = require("express");
const router = express.Router();
const { getAllImages, getUserImages, deleteImage, uploadImage } = require("../controllers/imageController");
const { protect } = require("../middleware/authMiddleware");
const upload = require("../utils/multer");

router.post("/", upload.single("image"), protect, uploadImage);
router.get("/", protect, getAllImages).get("/:id", protect, getUserImages);
router.delete("/:id", protect, deleteImage);
