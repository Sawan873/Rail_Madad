import express from "express"
import {isAuthenticated} from "../middleware/authUser.middleware.js"
import { loginUser , registerUser , logoutUser , getUserProfile, forgotPassword, resetPassword, getAllUsers, deleteUser } from "../controllers/auth.controllers.js"

const router  = express.Router();

router.post("/register" , registerUser);
router.post("/login" , loginUser);
router.post("/logout" , logoutUser);
router.get("/profile"  , isAuthenticated, getUserProfile);

router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

// Admin Routes for User Management
router.get("/users", isAuthenticated, getAllUsers);
router.delete("/users/:userId", isAuthenticated, deleteUser);

export default router;