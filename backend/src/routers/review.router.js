import express from "express";
import { isAdminAuthenticated } from "#middlewares/isAdminAuthenticated.js";
import {
  checkReview,
  submitReview,
  getAllReviews,
  updateReviewStatus,
  toggleFeaturedReview,
  deleteReview,
} from "#controllers/reviewControllers/index.js";
const router = express.Router();

router.get("/check-token/:tokenValue", checkReview);
router.post("/submit-review", submitReview);
router.get("/all-reviews", isAdminAuthenticated, getAllReviews);
router.put("/update-status", isAdminAuthenticated, updateReviewStatus);
router.patch("/toggle-featured", isAdminAuthenticated, toggleFeaturedReview);
router.delete("/delete/:reviewId", isAdminAuthenticated, deleteReview);

export default router;
