import express from "express";
import cors from "cors";
import {
  userSignUp,
  userLogin,
  refreshSession,
  verifySession,
  userLogout,
  adminSignUp,
  adminLogin,
  adminLogout,
  adminVerifySession,
  adminRefreshSession,
  verifyOTP,
  userUpdatePassword,
  superAdminLogin,
  sendEmail,
} from "#controllers/authControllers/index.js";
import { isAuthenticated } from "#middlewares/isAuthenticated.js";
import { isAdminAuthenticated } from "#middlewares/isAdminAuthenticated.js";


const router = express.Router();

const corsOptions = {
  origin: process.env.ORIGIN,
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "x-skip-auto-refresh",
    "X-Skip-Auto-Refresh",
  ],
};

// user
router.post("/signup", userSignUp);
router.post("/login", userLogin);
router.post("/logout", isAuthenticated, userLogout);
router.post("/update-pass", isAuthenticated, userUpdatePassword);

router.options("/me", cors(corsOptions));
router.post("/me", cors(corsOptions), isAuthenticated, verifySession);
router.post("/refresh", refreshSession);

// admin

router.post("/admin-signup", adminSignUp);
router.post("/admin-login", adminLogin);
//router.post("/admin-logout", adminLogout)
router.options("/admin-me", cors(corsOptions));
router.post(
  "/admin-me",
  cors(corsOptions),
  isAdminAuthenticated,
  adminVerifySession,
);
router.post("/admin-refresh", adminRefreshSession);
router.post("/admin-verify", sendEmail);
router.post("/admin-verify-otp", verifyOTP);
router.post("/super-admin-login", superAdminLogin);
export default router;
