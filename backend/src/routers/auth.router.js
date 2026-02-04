import { userSignUp } from "../controllers/authControllers/userSignUp.controller.js";
import { userLogin } from "../controllers/authControllers/userLogin.controller.js";
import { isAuthenticated } from "../midlewares/isAuthenticated.js";
import { verifySession } from "../controllers/authControllers/verifySession.controller.js";
import { refreshSession } from "../controllers/authControllers/refreshSession.controller.js";
import { userLogout } from "../controllers/authControllers/userLogout.controller.js";
import { adminSignUp } from "../controllers/authControllers/adminSignUp.controller.js";
import { adminLogin } from "../controllers/authControllers/adminLogin.controller.js";
import { adminLogout } from "../controllers/authControllers/adminLogout.controller.js";
import { adminVerifySession } from "../controllers/authControllers/adminVerifySession.controller.js";
import { adminRefreshSession } from "../controllers/authControllers/adminRefreshSession.controller.js";
import { isAdminAuthenticated } from "../midlewares/isAdminAuthenticated.js";
import { sendEmail } from "../controllers/authControllers/sendEmail.controller.js";
import { verifyOTP } from "../controllers/authControllers/verifyOTP.controller.js";
import express from "express";
import cors from "cors";
import { superAdminLogin } from "../controllers/authControllers/superAdminLogin.controller.js";

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

router.options("/me", cors(corsOptions));
router.post("/me", cors(corsOptions), isAuthenticated, verifySession);
router.post("/refresh", refreshSession);

// admin

router.post("/signup-admin", adminSignUp);
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
