import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { checkReviewForTokenApi, submitReviewApi } from "@api/reviewApi.js";
import { useContext } from "react";
import { NotificationsContext } from "@user/context/NotificationsContext";
import FullScreenLoader from "@component-support/FullScreenLoader";
import { Star, CheckCircle, AlertCircle } from "lucide-react";

// Import your background image here (Change this to whatever image you prefer!)
import heroImg from "@assets/media/heroBookings.jpg";

function UserSubmitReview() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // false = initial/invalid, "pending", "submitted", "approved", "rejected"
  const [reviewStatus, setReviewStatus] = useState(false);

  // Form States
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");

  const { showNotification } = useContext(NotificationsContext);
  const { id: token } = useParams();

  useEffect(() => {
    const checkReviewForToken = async (tokenValue) => {
      try {
        setIsLoading(true);
        const response = await checkReviewForTokenApi(tokenValue);
        if (response.success) {
          setReviewStatus(response.data.status);
        }
      } catch (error) {
        console.error("Error while loading the review", error);
        showNotification(
          true,
          false,
          error.message || "Invalid or expired review link."
        );
      } finally {
        setIsLoading(false);
      }
    };
    if (token) checkReviewForToken(token);
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0) {
      showNotification(true, false, "Please select a star rating.");
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await submitReviewApi(token, rating, comment);
      if (!response.success) {
        showNotification(true, false, response.message);
        return;
      }

      // MOCKING SUCCESS FOR NOW:
      setTimeout(() => {
        setReviewStatus(response.data.status);
        showNotification(true, true, "Thank you for your review!");
        setIsSubmitting(false);
      }, 1500);
    } catch (error) {
      showNotification(
        true,
        false,
        "Failed to submit review. Please try again."
      );
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <FullScreenLoader />;
  }

  // ==========================================
  // RENDER HELPERS BASED ON STATUS
  // ==========================================

  const renderInvalidToken = () => (
    <div className="review-status-card">
      <AlertCircle size={60} className="review-icon-error" />
      <h2 className="review-status-title">Invalid Link</h2>
      <p className="review-status-message">
        This review link is invalid, expired, or does not exist.
      </p>
    </div>
  );

  const renderSuccessState = (title, message) => (
    <div className="review-status-card">
      <CheckCircle size={60} className="review-icon-success" />
      <h2 className="review-status-title">{title}</h2>
      <p className="review-status-message">{message}</p>
    </div>
  );

  const renderReviewForm = () => (
    <div className="review-form-card">
      <div className="review-header">
        <h2 className="review-title">How was your stay?</h2>
        <p className="review-subtitle">
          We value your feedback to help us improve NextInn.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Star Rating Section */}
        <div className="star-rating-container">
          <div className="star-flex-group">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={40}
                className={`star-icon ${
                  star <= (hoverRating || rating)
                    ? "star-active"
                    : "star-inactive"
                }`}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setRating(star)}
              />
            ))}
          </div>
          <span className="star-rating-text">
            {rating === 0 ? "Select a rating" : `${rating} out of 5 stars`}
          </span>
        </div>

        {/* Comment Section */}
        <div className="review-form-group">
          <label className="review-label">
            Share your experience (Optional)
          </label>
          <textarea
            className="review-textarea"
            rows="5"
            placeholder="Tell us what you loved and what we can improve..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            maxLength={500}
          ></textarea>
          <div className="review-char-counter">
            {comment.length}/500 characters
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting || rating === 0}
          className={`review-submit-btn ${
            isSubmitting || rating === 0 ? "btn-disabled" : "btn-active"
          }`}
        >
          {isSubmitting ? "Submitting..." : "Submit Review"}
        </button>
      </form>
    </div>
  );

  return (
    <div className="review-main-wrapper">
      {/* --- HERO BANNER --- */}
      <div
        className="review-hero-banner"
        style={{ backgroundImage: `url(${heroImg})` }}
      >
        <div className="review-hero-overlay"></div>
        <div className="review-hero-content">
          <h1 className="review-hero-title">Guest Feedback</h1>
          <p className="review-hero-subtitle">
            Your insights help us continuously elevate the luxury experience at
            NextInn.
          </p>
        </div>
      </div>

      {/* --- REVIEW CARD CONTAINER --- */}
      <div className="review-page-container">
        <div className="review-page-card">
          {!reviewStatus && renderInvalidToken()}

          {reviewStatus === "pending" && renderReviewForm()}

          {reviewStatus === "submitted" &&
            renderSuccessState(
              "Review Submitted",
              "Thank you! Your review has been sent to our team for moderation."
            )}

          {reviewStatus === "approved" &&
            renderSuccessState(
              "Review is Live",
              "You have already submitted a review for this stay, and it is currently live!"
            )}

          {reviewStatus === "rejected" &&
            renderSuccessState(
              "Review Closed",
              "This review link is no longer accepting submissions."
            )}
        </div>
      </div>
    </div>
  );
}

export default UserSubmitReview;
