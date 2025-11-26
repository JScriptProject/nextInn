import { userSignUp } from "../controllers/authControllers/userSignUp.controller.js";
import { userLogin } from "../controllers/authControllers/userLogin.controller.js";
import { isAuthenticated } from "../midlewares/isAuthenticated.js";
import { verifySession } from "../controllers/authControllers/verifySession.controller.js";
import { refreshSession } from "../controllers/authControllers/refreshSession.controller.js";
import { adminSignUp } from "../controllers/authControllers/adminSignUp.controller.js";
import { adminLogin } from "../controllers/authControllers/adminLogin.controller.js";
import { verifyAdminSession } from "../controllers/authControllers/verifyAdminSession.controller.js";
import { refreshAdminSession } from "../controllers/authControllers/refreshAdminSession.controller.js";
import { isAdminAuthenticated } from "../midlewares/isAdminAuthenticated.js";

import express from "express";

const router = express.Router();

router.post("/signup", userSignUp);
router.post("/login", userLogin);
router.post("/me", isAuthenticated, verifySession);
router.post("/refresh", refreshSession);

router.post("/signup-admin", adminSignUp);
router.post("/admin-login", adminLogin);
router.post("/admin-me", isAdminAuthenticated, verifyAdminSession);
router.post("/admin-refresh", refreshAdminSession);

export default router;
