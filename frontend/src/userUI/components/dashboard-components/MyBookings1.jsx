import React, { useEffect, useState } from "react";
import {
  Calendar,
  Users,
  Home,
  IndianRupee,
  Tag,
  Ticket,
  ChevronDown,
  ChevronUp,
  Download,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";
import FullScreenLoader from "@component-support/FullScreenLoader";
import { getBookingByUser } from "@api/bookingApi.js";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { format } from "date-fns";

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("active"); // 'active' or 'archive'
  const [expandedBookingId, setExpandedBookingId] = useState(null);

  useEffect(() => {
    const fetchUserBookings = async () => {
      try {
        setIsLoading(true);
        const response = await getBookingByUser();
        if (response.success) {
          setBookings(response.data);
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserBookings();
  }, []);

  // --- LOGIC: Filter Bookings ---
  const activeBookings = bookings.filter((b) =>
    ["confirmed", "checked-in", "checked-out"].includes(b.bookingStatus)
  );

  const archivedBookings = bookings.filter((b) =>
    ["cancelled", "checked-out"].includes(b.bookingStatus)
  );

  const currentList =
    activeTab === "active" ? activeBookings : archivedBookings;

  // --- LOGIC: Toggle Expand ---
  const toggleExpand = (id) => {
    setExpandedBookingId(expandedBookingId === id ? null : id);
  };

  // --- LOGIC: Generate PDF ---
  const handleDownloadInvoice = (booking) => {

  const doc = new jsPDF();

    // 1. Header & Logo Placeholder
    doc.setFillColor(19, 78, 74); // Your Deep Teal Brand Color
    doc.rect(0, 0, 210, 40, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.text("NextInn Luxury Hotel", 14, 25);
    doc.setFontSize(10);
    doc.text("Booking Invoice", 170, 25);

    // 2. Booking Info
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    doc.text(`Booking ID: ${booking.bookingId}`, 14, 50);
    doc.text(`Guest: ${booking.userName || "Guest User"}`, 14, 56);
    doc.text(
      `Check-In: ${format(new Date(booking.checkIn), "MMM dd, yyyy")}`,
      14,
      62
    );
    doc.text(
      `Check-Out: ${format(new Date(booking.checkOut), "MMM dd, yyyy")}`,
      14,
      68
    );

    // 3. Prepare Table Data from priceBreakdown
    const pb = booking.priceBreakdown;
    const tableRows = [
      ["Base Room Charge", `Rs. ${pb.baseRoomCharge}`],
      ["Extra Room Charges", `Rs. ${pb.extraGuestCharges?.onlyRoom || 0}`],
      ["Extra Adult Charges", `Rs. ${pb.extraGuestCharges?.adults || 0}`],
      [
        "Addon: Pet Friendly",
        `Rs. ${pb.addonServicesCharges?.petFriendly || 0}`,
      ],
      ["Addon: Steam Room", `Rs. ${pb.addonServicesCharges?.steamRoom || 0}`],
      ["Addon: Laundry", `Rs. ${pb.addonServicesCharges?.laundry || 0}`],
      [
        { content: "Total Amount", styles: { fontStyle: "bold" } },
        {
          content: `Rs. ${booking.totalAmount}`,
          styles: { fontStyle: "bold" },
        },
      ],
    ];

    // 4. Generate Table
    autoTable(doc, {
      startY: 80,
      head: [["Description", "Amount"]],
      body: tableRows,
      theme: "grid",
      headStyles: { fillColor: [249, 115, 22] }, // Sunset Orange
    });

    // 5. Footer
    doc.text(
      "Thank you for choosing NextInn.",
      14,
      doc.lastAutoTable.finalY + 20
    );
    doc.save(`Invoice_${booking.bookingId}.pdf`);
  };

  if (isLoading) return <FullScreenLoader />;

  return (
    <div className="bookings-container">
      {/* 1. Tabs Header */}
      <div className="flex items-center gap-6 mb-8 border-b border-[var(--border-lightUI-softGray)]">
        <button
          className={`bookings-container-button-btn ${activeTab === "active" ? "bookings-container-button-btn-active" : "bookings-container-button-btn-no_active"}`}
          onClick={() => setActiveTab("active")}
        >
          Active Stays
        </button>
        <button
          className={`pb-3 text-sm font-bold uppercase tracking-wide transition-all ${activeTab === "archive" ? "text-[var(--accent-cta-sunset-orange)] border-b-2 border-[var(--accent-cta-sunset-orange)]" : "text-gray-400"}`}
          onClick={() => setActiveTab("archive")}
        >
          Booking History
        </button>
      </div>

      {/* 2. Bookings List */}
      {currentList.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 text-gray-400">
          <Clock size={48} className="mb-4 opacity-20" />
          <p>No {activeTab} bookings found.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {currentList.map((booking) => (
            <div
              key={booking._id}
              className={`bg-white border border-[var(--border-lightUI-softGray)] rounded-xl overflow-hidden transition-all duration-300 ${expandedBookingId === booking._id ? "shadow-lg ring-1 ring-[var(--accent-cta-sunset-orange)]" : "hover:shadow-md"}`}
            >
              {/* --- CARD HEADER (Always Visible) --- */}
              <div
                className="p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 cursor-pointer"
                onClick={() => toggleExpand(booking._id)}
              >
                {/* Left: Main Info */}
                <div className="flex items-start gap-4">
                  <div
                    className={`p-3 rounded-full ${booking.bookingStatus === "confirmed" ? "bg-green-50 text-green-600" : "bg-orange-50 text-orange-500"}`}
                  >
                    {booking.bookingStatus === "confirmed" ? (
                      <CheckCircle size={24} />
                    ) : (
                      <Clock size={24} />
                    )}
                  </div>
                  <div>
                    <h3 className="font-[Playfair-Display] text-lg font-bold text-[var(--text-primary-dark-Charcoal)]">
                      {booking.category?.name || "Luxury Suite"}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-[var(--text-secondary-gray)] mt-1">
                      <Calendar size={14} />
                      <span>
                        {format(new Date(booking.checkIn), "MMM dd")} -{" "}
                        {format(new Date(booking.checkOut), "MMM dd, yyyy")}
                      </span>
                      <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                      <span>ID: {booking.bookingId}</span>
                    </div>
                  </div>
                </div>

                {/* Right: Price & Status */}
                <div className="text-right">
                  <div className="text-xl font-bold text-[var(--text-primary-dark-Charcoal)]">
                    ₹{booking.totalAmount.toLocaleString()}
                  </div>
                  <div
                    className={`text-xs font-bold uppercase tracking-wider mt-1 ${booking.paymentStatus === "paid" ? "text-green-600" : "text-orange-500"}`}
                  >
                    {booking.paymentStatus}
                  </div>
                </div>
              </div>

              {/* --- EXPANDABLE SECTION (Hidden by default) --- */}
              {expandedBookingId === booking._id && (
                <div className="bg-[var(--background-offWhite-linen)] border-t border-[var(--border-lightUI-softGray)] p-6 animate-fadeIn">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Column 1: Guest & Room Details */}
                    <div>
                      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                        Stay Details
                      </h4>
                      <ul className="space-y-3 text-sm text-[var(--text-primary-dark-Charcoal)]">
                        <li className="flex justify-between border-b border-gray-100 pb-2">
                          <span className="flex items-center gap-2">
                            <Users size={14} /> Guests
                          </span>
                          <span className="font-medium">
                            {booking.guestDetails.adults} Adults,{" "}
                            {booking.guestDetails.children} Kids
                          </span>
                        </li>
                        <li className="flex justify-between border-b border-gray-100 pb-2">
                          <span className="flex items-center gap-2">
                            <Home size={14} /> Rooms
                          </span>
                          <span className="font-medium">
                            {booking.guestDetails.roomsCount} Rooms
                          </span>
                        </li>
                        <li className="flex justify-between border-b border-gray-100 pb-2">
                          <span className="flex items-center gap-2">
                            <Tag size={14} /> Extras
                          </span>
                          <span className="font-medium">
                            {booking.guestDetails.extraBed} Extra Beds
                          </span>
                        </li>
                      </ul>
                    </div>

                    {/* Column 2: Financial Breakdown */}
                    <div>
                      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                        Payment Breakdown
                      </h4>
                      <div className="bg-white p-4 rounded-lg border border-gray-100 space-y-2 text-sm">
                        <div className="flex justify-between text-gray-500">
                          <span>Base Charge</span>
                          <span>₹{booking.priceBreakdown.baseRoomCharge}</span>
                        </div>
                        {booking.priceBreakdown.extraGuestCharges?.onlyRoom >
                          0 && (
                          <div className="flex justify-between text-gray-500">
                            <span>Extra Room Cost</span>
                            <span>
                              ₹
                              {
                                booking.priceBreakdown.extraGuestCharges
                                  .onlyRoom
                              }
                            </span>
                          </div>
                        )}
                        {(booking.priceBreakdown.addonServicesCharges
                          ?.petFriendly > 0 ||
                          booking.priceBreakdown.addonServicesCharges
                            ?.steamRoom > 0) && (
                          <div className="flex justify-between text-gray-500">
                            <span>Add-ons Total</span>
                            <span>
                              ₹
                              {(booking.priceBreakdown.addonServicesCharges
                                ?.petFriendly || 0) +
                                (booking.priceBreakdown.addonServicesCharges
                                  ?.steamRoom || 0)}
                            </span>
                          </div>
                        )}
                        <div className="flex justify-between font-bold text-[var(--primary-deep-teal)] pt-3 border-t border-gray-100 mt-2">
                          <span>Grand Total</span>
                          <span>₹{booking.totalAmount.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-6 flex justify-end gap-4 pt-4 border-t border-gray-200">
                    <button
                      onClick={() => handleDownloadInvoice(booking)}
                      className="flex items-center gap-2 px-4 py-2 bg-white border border-[var(--text-secondary-gray)] text-[var(--text-primary-dark-Charcoal)] rounded-md hover:bg-gray-50 text-sm font-medium transition-colors"
                    >
                      <Download size={16} /> Download Invoice
                    </button>
                    {/* You can add a 'Cancel Booking' button here later if activeTab === 'active' */}
                  </div>
                </div>
              )}

              {/* Toggle Arrow (Visual Cue) */}
              <div
                className="bg-gray-50 p-1 flex justify-center cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => toggleExpand(booking._id)}
              >
                {expandedBookingId === booking._id ? (
                  <ChevronUp size={16} className="text-gray-400" />
                ) : (
                  <ChevronDown size={16} className="text-gray-400" />
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyBookings;
