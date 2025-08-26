import express from "express";
import { User } from "../models/userModel.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/profile", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json({ message: "Welcome to your profile", user });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
