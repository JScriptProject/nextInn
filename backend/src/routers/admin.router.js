import { Router } from "express";
import { isAdminAuthenticated } from "#middlewares/isAdminAuthenticated.js";
import { isSuperAdmin } from "#middlewares/isSuperAdmin.js";
import {
  getAllAdmins,
  addAdmin,
  updateAdmin,
  deleteAdmin,
  getAllLogs,
} from "#controllers/adminControllers/index.js";

const router = Router();

// all routes are protected and only accessible by superadmin
router.use(isAdminAuthenticated, isSuperAdmin);

router.route("/").get(getAllAdmins);
router.route("/add").post(addAdmin);
router.route("/:id").patch(updateAdmin).delete(deleteAdmin);
router.route("/logs").get(getAllLogs);

export default router;
