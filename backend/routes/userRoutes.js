const express = require("express");
const router = express.Router();
const { getAllUsers, registerUser, loginUser, updateUser, getMe } = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");
const upload = require("../utils/multer");

router.post("/", upload.single("avatar"), registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getMe);
router.get("/", getAllUsers);
router.put("/:id", upload.single("avatar"), protect, updateUser);

module.exports = router;
