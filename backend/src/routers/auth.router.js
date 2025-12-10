import { userSignUp } from "../controllers/authControllers/userSignUp.controller.js";
import { userLogin } from "../controllers/authControllers/userLogin.controller.js";
import { isAuthenticated } from "../midlewares/isAuthenticated.js";
import { verifySession } from "../controllers/authControllers/verifySession.controller.js";
import { refreshSession } from "../controllers/authControllers/refreshSession.controller.js";
import { adminSignUp } from "../controllers/authControllers/adminSignUp.controller.js";
import { adminLogin } from "../controllers/authControllers/adminLogin.controller.js";
import { verifyAdminSession } from "../controllers/authControllers/adminVerifySession.controller.js";
import { refreshAdminSession } from "../controllers/authControllers/adminRefreshSession.controller.js";
import { isAdminAuthenticated } from "../midlewares/isAdminAuthenticated.js";
import { userLogout } from "../controllers/authControllers/userLogout.controller.js";
import express from "express";
import cors from "cors";

const router = express.Router();

const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "x-skip-auto-refresh", "X-Skip-Auto-Refresh"],
};

// user
router.post("/signup", userSignUp);
router.post("/login", userLogin);
router.post("/logout",isAuthenticated, userLogout);

router.options("/me", cors(corsOptions));
router.post("/me", cors(corsOptions), isAuthenticated, verifySession);
router.post("/refresh", refreshSession);

// admin

router.post("/signup-admin", adminSignUp);
router.post("/admin-login", adminLogin);
router.post("/admin-logout", adminLogout)

router.options("/admin-me", cors(corsOptions));
router.post("/admin-me", cors(corsOptions), isAdminAuthenticated, verifyAdminSession);
router.post("/admin-refresh", refreshAdminSession);

export default router;
