import { Router } from "express";
import { isAdminAuthenticated } from "../middlewares/isAdminAuthenticated.js";
import { getDashboardData } from "../controllers/adminControllers/dashboard.controller.js";

const router = Router();

router.use(isAdminAuthenticated);

router.route("/").get(getDashboardData);

export default router;
