import React, { useEffect, useState } from "react";
import {
  Check,
  Clock,
  Eye,
  Trash2,
  XCircle,
  X,
  Search,
  Star,
  MessageSquare,
  ThumbsUp,
} from "lucide-react";
import Hero from "@admin/components/Hero";
// You can replace this with a review-specific image later
import heroBookingImg from "@assets/media/heroBookings.jpg";
import FullScreenLoader from "@component-support/FullScreenLoader";
import { useContext } from "react";
import { NotificationsContext } from "@user/context/NotificationsContext";
import {
  getAllReviews,
  updateReviewStatus,
  toggleFeaturedReview,
} from "@api/reviewApi.js";
import e from "cors";
// Import your APIs once created:
// import { getAllReviews, updateReviewStatus, deleteReview, toggleFeaturedReview } from "@api/reviewApi.js";

const REVIEW_STATUSES = ["Pending", "Submitted", "Approved", "Rejected"];

function ManageReviews() {
  const [reviews, setReviews] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isLoading, setIsLoading] = useState(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 15;

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(""); // 'view', 'status', 'delete'
  const [selectedReview, setSelectedReview] = useState(null);

  const { showNotification } = useContext(NotificationsContext);

  const heroContent = {
    websiteTitle: "Manage Reviews",
    websiteSubtitle:
      "Moderate guest feedback and select featured reviews for the homepage.",
  };

  // 1. Fetch Data
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchData();
    }, 500);
    return () => clearTimeout(timer);
  }, [currentPage, filterStatus, searchTerm]);

  // Reset to page 1 on filter change
  useEffect(() => {
    setCurrentPage(1);
  }, [filterStatus, searchTerm]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      // TODO: Replace with your actual API call
      const response = await getAllReviews(
        currentPage,
        limit,
        filterStatus,
        searchTerm
      );
      console.log(response);
      if (!response.success) {
        setReviews([]);
        showNotification(true, false, response.message);
      }
      setReviews(response.data.allReviews);
      setTotalPages(response.data.pagination.totalPages);
      showNotification(true, true, response.message);
    } catch (error) {
      console.error("Failed to fetch reviews", error);
      showNotification(true, false, "Failed to load reviews.");
    } finally {
      setIsLoading(false);
    }
  };

  // 2. Modal Controls
  const openModal = (review, type) => {
    setSelectedReview({ ...review });
    setModalType(type);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedReview(null);
  };

  // 3. Action Handlers
  const handleStatusUpdate = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // TODO: Call your update API
      const response = await updateReviewStatus(
        selectedReview._id,
        selectedReview.status
      );
      if (!response.success) {
        showNotification(true, false, response.message);
      }
      showNotification(true, true, response.message);
      closeModal();
      fetchData();
    } catch (error) {
      console.error(error);
      showNotification(true, false, "Failed to update status.");
    } finally {
      fetchData();
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setIsLoading(true);
    try {
      // TODO: Call your delete API
      // await deleteReview(id);
      showNotification(true, true, "Review deleted successfully.");
      closeModal();
      fetchData();
    } catch (error) {
      console.error(error);
      showNotification(true, false, "Failed to delete review.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleFeatured = async (review) => {
    if (review.status !== "approved") {
      showNotification(true, false, "Only approved reviews can be featured.");
      return;
    }

    setIsLoading(true);
    try {
      // TODO: Call your feature toggle API
      const response = await toggleFeaturedReview(
        review._id,
        !review.isFeatured
      );
      if (response.success) {
        showNotification(
          true,
          true,
          `Review ${review.isFeatured ? "removed from" : "added to"} featured list.`
        );
        fetchData();
      } else {
        showNotification(true, false, "Error while toggeling the review");
        return;
      }
    } catch (error) {
      console.error(error);
      showNotification(
        true,
        false,
        error.message || "Failed to feature review."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // 4. UI Helpers
  const renderStars = (rating) => {
    if (!rating)
      return <span className="review-star-empty text-sm">Not Rated</span>;
    return (
      <div className="review-stars-wrapper">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={14}
            className={i < rating ? "review-star-filled" : "review-star-empty"}
          />
        ))}
      </div>
    );
  };

  const getStatusBadge = (status) => {
    if (!status) return null;
    const normalized = status.toLowerCase();

    if (normalized === "approved")
      return (
        <span className="admin-status-badge badge-booking-confirmed">
          <Check size={12} /> Approved
        </span>
      );
    if (normalized === "rejected")
      return (
        <span className="admin-status-badge badge-booking-cancelled">
          <XCircle size={12} /> Rejected
        </span>
      );
    if (normalized === "submitted")
      return (
        <span className="admin-status-badge badge-booking-pending">
          <Clock size={12} /> Needs Review
        </span>
      );

    return (
      <span className="admin-status-badge badge-payment-refunded">
        {status}
      </span>
    );
  };

  if (isLoading) return <FullScreenLoader />;

  return (
    <div className="admin-container">
      <Hero
        title={heroContent.websiteTitle}
        subtitle={heroContent.websiteSubtitle}
        image={heroBookingImg}
      />

      <div className="admin-body-container">
        {/* --- CONTROLS SECTION --- */}
        <div className="admin-controls-wrapper flex-wrap">
          <div className="search-box-container">
            <Search className="search-icon" />
            <input
              type="text"
              placeholder="Search by Guest Name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="admin-search-input"
            />
          </div>

          <div className="filter-box-container">
            <label>Status:</label>
            <select
              className="admin-select-input"
              onChange={(e) => setFilterStatus(e.target.value)}
              value={filterStatus}
            >
              <option value="all">All Reviews</option>
              {REVIEW_STATUSES.map((s) => (
                <option key={s} value={s.toLowerCase()}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* --- TABLE SECTION --- */}
        <div className="admin-table-container">
          <table className="admin-data-table">
            <thead>
              <tr>
                <th>Guest</th>
                <th>Room Category</th>
                <th>Rating</th>
                <th>Status</th>
                <th>Featured</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reviews?.length > 0 ? (
                reviews.map((review) => (
                  <tr key={review._id} className="admin-table-row">
                    <td>
                      <div className="review-guest-col">
                        <span className="review-guest-name">
                          {review.user?.firstname} {review.user?.lastname}
                        </span>
                        <span className="review-guest-date">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </td>
                    <td className="font-semibold text-[var(--primary-deep-teal)]">
                      {review.category?.name || "N/A"}
                    </td>
                    <td>{renderStars(review.rating)}</td>
                    <td>{getStatusBadge(review.status)}</td>
                    <td>
                      <button
                        onClick={() => handleToggleFeatured(review)}
                        title={
                          review.status !== "approved"
                            ? "Approve review to feature it"
                            : "Toggle Featured"
                        }
                        disabled={review.status !== "approved"}
                        className={`feature-btn ${
                          review.isFeatured
                            ? "feature-btn-active"
                            : "feature-btn-inactive"
                        }`}
                      >
                        <Star
                          size={18}
                          className={
                            review.isFeatured ? "feature-star-active" : ""
                          }
                        />
                      </button>
                    </td>
                    <td>
                      <div className="admin-action-buttons">
                        <button
                          className="action-btn view-btn"
                          onClick={() => openModal(review, "view")}
                          title="Read Review"
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          className="action-btn edit-btn"
                          onClick={() => openModal(review, "status")}
                          title="Change Status"
                        >
                          <ThumbsUp size={18} />
                        </button>
                        <button
                          className="action-btn delete-btn"
                          onClick={() => openModal(review, "delete")}
                          title="Delete Review"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center py-10 text-[var(--text-secondary-gray)]"
                  >
                    No reviews found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* PAGINATION */}
          {totalPages > 1 && (
            <div className="pagination-rooms">
              <span className="pagination-rooms-page">
                Page {currentPage} of {totalPages}
              </span>
              <div className="pagination-btn-group">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="pagination-btn-pre"
                >
                  Previous
                </button>
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="pagination-btn-next"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* --- MODALS --- */}
      {isModalOpen && selectedReview && (
        <div className="admin-modal-overlay">
          <div
            className={`admin-modal-content ${modalType === "view" ? "modal-lg" : "modal-md"}`}
          >
            <div className="admin-modal-header">
              <h2>
                {modalType === "view" && "Read Review"}
                {modalType === "status" && "Moderate Review"}
                {modalType === "delete" && "Delete Review"}
              </h2>
              <button className="modal-close-btn" onClick={closeModal}>
                <X size={24} />
              </button>
            </div>

            {/* VIEW MODAL */}
            {modalType === "view" && (
              <div className="admin-modal-body">
                <div className="review-view-container">
                  <div className="review-view-header">
                    <div>
                      <h3 className="review-view-name">
                        {selectedReview.user?.firstname}{" "}
                        {selectedReview.user?.lastname}
                      </h3>
                      <p className="review-view-email">
                        {selectedReview.user?.email}
                      </p>
                    </div>
                    <div>{renderStars(selectedReview.rating)}</div>
                  </div>
                  <div className="review-view-room-wrapper">
                    <span className="review-view-room">
                      Room: {selectedReview.category?.name}
                    </span>
                  </div>
                  <div className="review-view-comment">
                    <MessageSquare size={16} className="review-comment-icon" />"
                    {selectedReview.comment || "No written comment provided."}"
                  </div>
                </div>
              </div>
            )}

            {/* STATUS MODAL */}
            {modalType === "status" && (
              <div className="admin-modal-body">
                <form onSubmit={handleStatusUpdate} className="admin-form">
                  <div className="form-group">
                    <label>Review Status</label>
                    <select
                      value={selectedReview.status}
                      onChange={(e) =>
                        setSelectedReview({
                          ...selectedReview,
                          status: e.target.value,
                        })
                      }
                      className="admin-form-input"
                    >
                      <option value="pending">Pending (Awaiting Guest)</option>
                      <option value="submitted">
                        Submitted (Needs Moderation)
                      </option>
                      <option value="approved">Approved (Live on Site)</option>
                      <option value="rejected">Rejected (Hidden)</option>
                    </select>
                  </div>

                  {selectedReview.status === "approved" && (
                    <p className="review-status-warning">
                      * This review will be visible to the public.
                    </p>
                  )}

                  <div className="admin-modal-footer">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="btn-modal-cancel"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn-modal-save"
                      disabled={
                        selectedReview.status === "pending" ||
                        selectedReview.status === "submitted"
                      }
                    >
                      Update Status
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* DELETE MODAL */}
            {modalType === "delete" && (
              <div className="admin-modal-body text-center py-6">
                <div className="delete-warning-icon">
                  <Trash2 size={48} />
                </div>
                <h3 className="text-xl font-bold mb-2">
                  Are you absolutely sure?
                </h3>
                <p className="review-delete-text">
                  This will permanently delete the review from{" "}
                  {selectedReview.user?.firstname}. This cannot be undone.
                </p>
                <div className="admin-modal-footer justify-center">
                  <button onClick={closeModal} className="btn-modal-cancel">
                    Cancel
                  </button>
                  <button
                    onClick={() => handleDelete(selectedReview._id)}
                    className="btn-modal-danger"
                  >
                    Yes, Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ManageReviews;
