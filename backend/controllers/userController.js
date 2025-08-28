const User = require("../models/User");
const bcrypt = require("bcryptjs");

// Update profile (name + image)
exports.updateProfile = async (req, res) => {
  try {
    const { fullName } = req.body;
    const profileImageUrl = req.file ? `/uploads/${req.file.filename}` : undefined;

    const updateData = {};
    if (fullName) updateData.fullName = fullName;
    if (profileImageUrl) updateData.profileImageUrl = profileImageUrl;

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,   // _id is available since you select user in authMiddleware
      { $set: updateData },
      { new: true }
    ).select("-password");

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Error updating profile", error });
  }
};

// Update password
exports.updatePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    const user = await User.findById(req.user._id);

    // Check old password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Old password is incorrect" });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    res.json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating password", error });
  }
};
// VERIFY old password only (no update)
exports.verifyPassword = async (req, res) => {
  try {
    const { oldPassword } = req.body;
    if (!oldPassword) return res.status(400).json({ ok: false, message: "Old password is required" });

    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ ok: false, message: "User not found" });

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) return res.status(200).json({ ok: false, message: "Old password is incorrect" });

    return res.status(200).json({ ok: true });
  } catch (e) {
    return res.status(500).json({ ok: false, message: "Error verifying password" });
  }
};

