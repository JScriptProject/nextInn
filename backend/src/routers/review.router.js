import express from "express";
import { checkReview } from "#controllers/reviewControllers/checkReview.controller.js";
import { submitReview } from "#controllers/reviewControllers/submitReview.controller.js";
import { getAllReviews } from "#controllers/reviewControllers/getAllReviews.controller.js";
import { isAdminAuthenticated } from "#middlewares/isAdminAuthenticated.js";

const router = express.Router();

router.get("/check-token/:tokenValue", checkReview);
router.post("/submit-review", submitReview);
router.get("/all-reviews", isAdminAuthenticated , getAllReviews);

export default router;