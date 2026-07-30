import { User } from "../models/User.model.js";
import bcrypt from "bcryptjs";
import { successResponse, errorResponse } from "../utils/responseHandler.js";
import createToken from "../jwt/authToken.js";
import jwt from "jsonwebtoken";
import { sendPasswordResetMail, sendAccountDeletedMail } from "../utils/sendMail.js";

export const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, phoneNumber } = req.body;

    const requiredFields = {
      email,
      firstName,
      lastName,
      password,
      phoneNumber,
    };

    const missingFields = Object.entries(requiredFields)
      .filter(([key, value]) => !value)
      .map(([key]) => key);

    if (missingFields.length > 0) {
      return res
        .status(400)
        .json({ message: "Missing required fields", missingFields });
    }

    const userExist = await User.findOne({ email });
    if (userExist) {
      return errorResponse(
        res,
        "User already exists, Try login with entered email",
        409,
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phoneNumber,
    });

    await newUser.save();

    return successResponse(res, newUser, "User registered successfully", 201);
  } catch (error) {
    console.log(error);
    return errorResponse(res, "Something went wrong", 500);
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const requiredFields = { email, password };

    const missingFields = Object.entries(requiredFields)
      .filter(([key, value]) => !value)
      .map(([key]) => key);

    if (missingFields.length > 0) {
      return res
        .status(400)
        .json({ message: "Missing required fields", missingFields });
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return errorResponse(
        res,
        "User not found with this email, Please register first",
        404,
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return errorResponse(res, "Invalid credentials", 401);
    }

    const token = await createToken(user._id, res);

    const { password: _removed, ...safeUser } = user.toObject();

    return successResponse(res, {
      user: safeUser,
      token,
      message: "User logged in successfully",
    });
  } catch (error) {
    console.log(error);
    return errorResponse(res, "Something went wrong", 500);
  }
};

export const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return successResponse(res, null, "User logged out successfully");
  } catch (error) {
    console.log(error);
    return errorResponse(res, "Something went wrong", 500);
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    if (!user) {
      return errorResponse(res, "User not found", 404);
    }

    return successResponse(res, { user }, "User profile retrieved successfully");
  } catch (error) {
    console.log(error);
    return errorResponse(res, "Something went wrong", 500);
  }
};

export const forgotPassword = async (req, res) => {
  console.log("request genrated", req.body);
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return successResponse(res, { message: "If an account exists, a password reset link has been sent." });
    }

    if (user.role !== "passenger") {
      return res.status(403).json({ success: false, message: "Only passengers can reset passwords this way." });
    }

    const resetToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '15m' });
    const resetLink = `${process.env.FRONTEND_URL || "http://localhost:5173"}/reset-password/${resetToken}`;

    
    await sendPasswordResetMail({ to: user.email, name: user.firstName, resetLink });
    console.log("After mail");

    return successResponse(res, { message: "If an account exists, a password reset link has been sent." });
  } catch (error) {
    console.error("Forgot password error:", error);
    return errorResponse(res, "Something went wrong", 500);
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;

    if (!newPassword || newPassword.length < 8) {
      return res.status(400).json({ success: false, message: "Password must be at least 8 characters long" });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    } catch (err) {
      return res.status(400).json({ success: false, message: "Invalid or expired token" });
    }

    const user = await User.findById(decoded.userId);
    if (!user || user.role !== "passenger") {
      return res.status(404).json({ success: false, message: "User not found or invalid role" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    return successResponse(res, { message: "Password reset successfully. You can now log in." });
  } catch (error) {
    console.error("Reset password error:", error);
    return errorResponse(res, "Something went wrong", 500);
  }
};

// ── Admin: Get All Passengers ──────────────────────────────────────────────────
export const getAllUsers = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ success: false, message: "Access denied. Only admins can view users." });
    }

    const { page = 1, limit = 50 } = req.query;
    const skip = (parseInt(page, 10) - 1) * parseInt(limit, 10);

    const users = await User.find({ role: "passenger" })
      .select("-password")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit, 10));

    return res.status(200).json({
      success: true,
      message: "Passengers fetched successfully",
      data: users,
    });
  } catch (error) {
    console.error("Get all users error:", error.message);
    return errorResponse(res, "Something went wrong", 500);
  }
};

// ── Admin: Ban/Delete User ─────────────────────────────────────────────────────
export const deleteUser = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ success: false, message: "Access denied. Only admins can delete users." });
    }

    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (user.role === "admin") {
      return res.status(403).json({ success: false, message: "Cannot delete an admin account" });
    }

    await User.findByIdAndDelete(userId);

    // Send email to the user (asynchronously)
    if (user.email) {
      sendAccountDeletedMail({ to: user.email, name: user.firstName }).catch(console.error);
    }

    return res.status(200).json({
      success: true,
      message: "User account deleted successfully",
    });
  } catch (error) {
    console.error("Delete user error:", error.message);
    return errorResponse(res, "Something went wrong", 500);
  }
};
