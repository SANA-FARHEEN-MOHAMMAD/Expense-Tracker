const express = require("express");
const { updateProfile, updatePassword } = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");
const {verifyPassword } = require("../controllers/userController");

const router = express.Router();

// Update profile (name + pic)
router.put("/update", protect, upload.single("profileImageUrl"), updateProfile);

// Update password
router.put("/password", protect, updatePassword);
router.post("/verify-password", protect, verifyPassword);


module.exports = router;
