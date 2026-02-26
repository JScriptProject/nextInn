import {
  Calendar,
  Check,
  Clock,
  CreditCard,
  Trash2,
  User,
  X,
  XCircle,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Hero from "@admin/components/Hero";
import BookingControls from "@admin/components/BookingControls";
import heroBookingImg from "@assets/media/heroBookings.jpg";
import {
  getAllBookingsByDate,
  updateBookingStatus,
  cancelBooking,
} from "@api/bookingApi.js";
import BookingTable from "@admin/components/BookingTable";
import FullScreenLoader from "@component-support/FullScreenLoader";

// ==========================================
// 1. DEFINE STATE MACHINE RULES (CONSTANTS)
// ==========================================
const BOOKING_TRANSITIONS = {
  confirmed: ["cancelled", "checked-in"],
  "checked-in": ["checked-out"],
  "checked-out": [], // Terminal state
  cancelled: [], // Terminal state
};

const PAYMENT_TRANSITIONS = {
  pending: ["paid", "failed"],
  paid: ["refunded"],
  failed: [], // Terminal state
  refunded: [], // Terminal state
};

// Helper for formatting labels (e.g., "checked-in" -> "Checked In")
// const formatStatusLabel = (status) => {
//   return status
//     .split("-")
//     .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
//     .join(" ");
// };

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const getStatusBadge = (status, type = "booking") => {
  const statusClass =
    type === "booking" ? `badge-booking-${status}` : `badge-payment-${status}`;

  let icon = null;
  if (status === "confirmed" || status === "paid" || status === "refunded") {
    icon = <Check size={12} />;
  }

  if (status === "pending") {
    icon = <Clock size={12} />;
  }
  if (status === "failed" || status === "cancelled") {
    icon = <XCircle size={12} />;
  }
  return (
    <span className={`admin-status-badge ${statusClass}`}>
      {icon}
      {status}
    </span>
  );
};

function ManageBookings() {
  const [bookings, setBookings] = useState([]);
  // const [searchTerm, setSearchTerm] = useState("");
  const [filterStaus, setFilterStatus] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [selectedBooking, setSelectedBooking] = useState(null);

  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(new Date().setDate(new Date().getDate() + 30)),
      key: "selection",
    },
  ]);

  const location = useLocation();
  const incomingBookingId = location.state?.searchBookingId || "";
  const [searchTerm, setSearchTerm] = useState(incomingBookingId);

  const heroContent = {
    websiteTitle: "Manage Bookings",
    websiteSubtitle: "NextInn admin's control over the bookings..",
  };

  //filtering logic
  const filteredBookings = bookings?.filter((booking) => {
    if(!booking)
      return false;
    const matchesSearch =
      booking.bookingId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (booking.user.firstname &&
        booking.user.firstname
          .toLowerCase()
          .includes(searchTerm.toLowerCase())) ||
      (booking.user.lastname &&
        booking.user.lastname.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus =
      filterStaus === "all" || booking.bookingStatus === filterStaus;

    return matchesSearch && matchesStatus;
  });

  useEffect(() => {
    async function getBookingData() {
      setIsLoading(true);
      const result = await getAllBookingsByDate(
        dateRange[0].startDate,
        dateRange[0].endDate
      );
      setBookings(result.data);
      setIsLoading(false);
    }
    getBookingData();
  }, []);
  const openModal = (booking, type) => {
    setSelectedBooking({ ...booking });
    setIsModalOpen(true);
    setModalType(type);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBooking(null);
  };

  const handleUpdates = async (e, id) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.target);
      const data = Object.fromEntries(formData.entries());
      const updatedData = { ...data, idx: id };

      setIsLoading(true);
      const response = await updateBookingStatus(updatedData);

      // SAFER APPROACH: Just re-fetch all the data to ensure UI matches DB exactly
      const result = await getAllBookingsByDate(
        dateRange[0].startDate,
        dateRange[0].endDate
      );
      setBookings(result.data);
    } catch (error) {
      console.error("Error=>", error);
    } finally {
      setIsModalOpen(false);
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      setIsLoading(true);
      const response = await cancelBooking({ idx: id });
      if (Array.isArray(response.data)) {
        setBookings(response.data);
      }
    } catch (error) {
      console.error("error=>", error);
    } finally {
      setIsModalOpen(false);
      setIsLoading(false);
    }
  };

  // ==========================================
  // 2. HELPER TO GET OPTIONS (The "Bouncer")
  // ==========================================
  const getOptions = (type) => {
    if (!selectedBooking) return [];

    // Find the ORIGINAL status from the main list (Source of Truth)
    // We use the main 'bookings' array because 'selectedBooking' changes as user selects dropdowns
    const originalItem = bookings.find((b) => b._id === selectedBooking._id);
    if (!originalItem) return [];

    const currentStatus =
      type === "booking"
        ? originalItem.bookingStatus
        : originalItem.paymentStatus;
    const rules =
      type === "booking" ? BOOKING_TRANSITIONS : PAYMENT_TRANSITIONS;

    // Allowed next steps
    const allowedNextSteps = rules[currentStatus] || [];

    // The dropdown should show: Current Status + Allowed Next Steps
    const optionsToShow = [currentStatus, ...allowedNextSteps];

    // Remove duplicates just in case
    return [...new Set(optionsToShow)];
  };

  if (isLoading) {
    return <FullScreenLoader />;
  }

  console.log("Booking=>", bookings);
  console.log("Filtered Bookings =>", filteredBookings);
  console.log("date range =>", dateRange);
  return (
    <div className="admin-container">
      <Hero
        title={heroContent.websiteTitle}
        subtitle={heroContent.websiteSubtitle}
        image={heroBookingImg}
      />
      <div className="admin-body-container">
        <BookingControls
          filterStaus={filterStaus}
          setFilterStatus={setFilterStatus}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          dateRange={dateRange}
          setDateRange={setDateRange}
          setIsLoading={setIsLoading}
          setBookings={setBookings}
        />
        <BookingTable
          filteredBookings={filteredBookings}
          openModal={openModal}
          formatDate={formatDate}
          getStatusBadge={getStatusBadge}
        />
      </div>

      {/* MODALS */}
      {isModalOpen && selectedBooking && (
        <div className="admin-modal-overlay">
          <div
            className={`admin-modal-content ${modalType === "view" ? "modal-lg" : "modal-md"}`}
          >
            {/* ... Header (Same as before) ... */}
            <div className="admin-modal-header">
              <h2>
                {modalType === "view" &&
                  `Booking Details: #${selectedBooking.bookingId.toUpperCase()}`}
                {modalType === "edit" &&
                  `Update Status: #${selectedBooking.bookingId.toUpperCase()}`}
                {modalType === "delete" && `Cancel Booking`}
              </h2>
              <button className="modal-close-btn" onClick={closeModal}>
                <X size={24} />
              </button>
            </div>

            {/* ... View Modal Body (Same as before) ... */}
            {modalType === "view" && (
              <div className="admin-modal-body">
                {/* ... (Keep your existing View code here) ... */}
                <div className="booking-details-grid">
                  <div className="details-card">
                    <h3>
                      <User size={18} className="inline mr-2" /> Guest
                      Information
                    </h3>
                    <p>
                      <strong>Name:</strong> {selectedBooking.user.firstname}{" "}
                      {selectedBooking.user.lastname}
                    </p>
                    <p>
                      <strong>Email:</strong> {selectedBooking.user.email}
                    </p>
                    <p>
                      <strong>Phone:</strong> {selectedBooking.user.mobile}
                    </p>
                  </div>
                  <div className="details-card">
                    <h3>
                      <Calendar size={18} className="inline mr-2" /> Stay
                      Details
                    </h3>
                    <p>
                      <strong>Check In:</strong>{" "}
                      {formatDate(selectedBooking.checkIn)}
                    </p>
                    <p>
                      <strong>Check Out:</strong>{" "}
                      {formatDate(selectedBooking.checkOut)}
                    </p>
                    <p>
                      <strong>Guests:</strong>{" "}
                      {selectedBooking.guestDetails?.adults} Adults,{" "}
                      {selectedBooking.guestDetails?.children} Kids
                    </p>
                  </div>
                  {selectedBooking.priceBreakdown && (
                    <div className="details-card full-width">
                      <h3>
                        <CreditCard size={18} className="inline mr-2" /> Payment
                      </h3>
                      <div className="breakdown-list">
                        <div className="breakdown-item total">
                          <span>Total Amount:</span>
                          <span>₹{selectedBooking.totalAmount}</span>
                        </div>
                      </div>
                      <div className="mt-4 flex gap-4">
                        <p>
                          <strong>Booking:</strong>{" "}
                          {getStatusBadge(
                            selectedBooking.bookingStatus,
                            "booking"
                          )}
                        </p>
                        <p>
                          <strong>Payment:</strong>{" "}
                          {getStatusBadge(
                            selectedBooking.paymentStatus,
                            "payment"
                          )}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* --- UPDATED EDIT MODAL --- */}
            {modalType === "edit" && (
              <div className="admin-modal-body">
                <form
                  onSubmit={(e) => handleUpdates(e, selectedBooking._id)}
                  className="admin-form"
                >
                  {/* BOOKING STATUS SELECT */}
                  <div className="form-group">
                    <label>Booking Status</label>
                    <select
                      name="bookingStatus"
                      value={selectedBooking.bookingStatus}
                      onChange={(e) =>
                        setSelectedBooking({
                          ...selectedBooking,
                          bookingStatus: e.target.value,
                        })
                      }
                      className="admin-form-input"
                    >
                      {getOptions("booking").map((status) => (
                        <option key={status} value={status}>
                          {/* {formatStatusLabel(status)} */}
                          {status}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* PAYMENT STATUS SELECT */}
                  <div className="form-group">
                    <label>Payment Status</label>
                    <select
                      name="paymentStatus"
                      value={selectedBooking.paymentStatus}
                      onChange={(e) =>
                        setSelectedBooking({
                          ...selectedBooking,
                          paymentStatus: e.target.value,
                        })
                      }
                      className="admin-form-input"
                    >
                      {getOptions("payment").map((status) => (
                        <option key={status} value={status}>
                          {/* {formatStatusLabel(status)} */}
                          {status}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="admin-modal-footer">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="btn-modal-cancel"
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn-model-save">
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* ... Delete Modal (Same as before) ... */}
            {modalType === "delete" && (
              // ... Keep your existing delete modal code ...
              <div className="admin-modal-body text-center py-6">
                <div className="delete-warning-icon">
                  <Trash2 size={48} />
                </div>
                <h3 className="text-xl font-bold mb-2">
                  Are you absolutely sure?
                </h3>
                <p className="mb-6">This action cannot be undone.</p>
                <div className="admin-modal-footer justify-center">
                  <button onClick={closeModal} className="btn-modal-cancel">
                    Keep Booking
                  </button>
                  <button
                    className="btn-modal-danger"
                    onClick={() => handleDelete(selectedBooking._id)}
                  >
                    Yes, Cancel
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

export default ManageBookings;
