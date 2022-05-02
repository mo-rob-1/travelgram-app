const express = require("express");
const router = express.Router();
const { getImages, updateImage, deleteImage, uploadImage, getUserImages } = require("../controllers/imageController");
const { protect } = require("../middleware/authMiddleware");
const upload = require("../utils/multer");

router.post("/", upload.single("image"), protect, uploadImage);
router.route("/").get(getImages);
router.route("/:id").put(protect, updateImage);
router.route("/:id").delete(protect, deleteImage);
router.route("/:id").get(getUserImages);

module.exports = router;
