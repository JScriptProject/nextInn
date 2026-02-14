import { format } from "date-fns";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import {
  Calendar,
  CheckCircle,
  Clock,
  Users,
  Home,
  Tag,
  Download,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import React from "react";


// Helper to load image for PDF
const loadImage = (url) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;
    img.onload = () => resolve(img);
    img.onerror = (err) => reject(err);
  });
};

function BookingList({ currentList, activeTab, toggleExpand, expandId }) {
  
    const handleDownloadInvoice = async (booking) => {
      const doc = new jsPDF();

      // --- 1. Load Logo ---
      try {
        // Ensure logo.png is directly in your public folder
        const logoImg = await loadImage("/logo.png");
        // Add Logo (X, Y, Width, Height)
        doc.addImage(logoImg, "PNG", 14, 10, 25, 25);
      } catch (e) {
        console.warn("Logo not found, skipping...");
      }

      // --- 2. Header Section ---
      // Company Info (Right Aligned)
      doc.setFontSize(20);
      doc.setTextColor(19, 78, 74); // Deep Teal
      doc.setFont("helvetica", "bold");
      doc.text("INVOICE", 195, 20, { align: "right" });

      doc.setFontSize(10);
      doc.setTextColor(100); // Gray
      doc.setFont("helvetica", "normal");
      doc.text(`Invoice #: INV-${booking.bookingId}`, 195, 26, {
        align: "right",
      });
      doc.text(`Date: ${format(new Date(), "MMM dd, yyyy")}`, 195, 31, {
        align: "right",
      });

      // Status Badge (Top Right)
      doc.setTextColor(booking.paymentStatus === "paid" ? "green" : "orange");
      doc.text(`Status: ${booking.paymentStatus.toUpperCase()}`, 195, 36, {
        align: "right",
      });

      // Divider Line
      doc.setDrawColor(229, 231, 235); // Light Gray
      doc.line(14, 45, 196, 45);

      // --- 3. Billing Details (Two Columns) ---
      const startY = 55;

      // Column 1: From (Hotel)
      doc.setFontSize(10);
      doc.setTextColor(19, 78, 74); // Deep Teal
      doc.setFont("helvetica", "bold");
      doc.text("FROM:", 14, startY);

      doc.setTextColor(0);
      doc.setFont("helvetica", "normal");
      doc.text("NextInn Luxury Hotel", 14, startY + 5);
      doc.text("Mahim East, Mumbai 12", 14, startY + 10);
      doc.text("Ocean View Room", 14, startY + 15);
      doc.text("support@nextinn.com", 14, startY + 20);

      // Column 2: Bill To (Guest)
      doc.setTextColor(19, 78, 74); // Deep Teal
      doc.setFont("helvetica", "bold");
      doc.text("BILL TO:", 120, startY);

      doc.setTextColor(0);
      doc.setFont("helvetica", "normal");
      doc.text(`${booking?.user?.firstname} ${booking?.user?.lastname}` || "Guest User", 120, startY + 5);
      doc.text(`Booking ID: ${booking.bookingId}`, 120, startY + 10);
      doc.text(
        `Check-In: ${format(new Date(booking.checkIn), "MMM dd, yyyy")}`,
        120,
        startY + 15
      );
      doc.text(
        `Check-Out: ${format(new Date(booking.checkOut), "MMM dd, yyyy")}`,
        120,
        startY + 20
      );

      // --- 4. Table Data ---
      const pb = booking.priceBreakdown;
      const tableRows = [
        ["Base Room Charge", `Rs. ${pb.baseRoomCharge.toLocaleString()}`],
        [
          "Extra Room Charges",
          `Rs. ${(pb.extraGuestCharges?.onlyRoom || 0).toLocaleString()}`,
        ],
        [
          "Extra Adult Charges",
          `Rs. ${(pb.extraGuestCharges?.adults || 0).toLocaleString()}`,
        ],
        [
          "Pet Friendly Fee",
          `Rs. ${(pb.addonServicesCharges?.petFriendly || 0).toLocaleString()}`,
        ],
        [
          "Steam Room",
          `Rs. ${(pb.addonServicesCharges?.steamRoom || 0).toLocaleString()}`,
        ],
        [
          "Laundry Service",
          `Rs. ${(pb.addonServicesCharges?.laundry || 0).toLocaleString()}`,
        ],
      ];

      // Add Total Row
      tableRows.push([
        {
          content: "Grand Total",
          styles: { fontStyle: "bold", textColor: [19, 78, 74] },
        },
        {
          content: `Rs. ${booking.totalAmount.toLocaleString()}`,
          styles: { fontStyle: "bold", textColor: [19, 78, 74] },
        },
      ]);

      // --- 5. Generate Table ---
     autoTable(doc, {
       startY: 90,
       head: [["Description", "Amount"]],
       body: tableRows,
       theme: "plain",
       headStyles: {
         fillColor: [19, 78, 74],
         textColor: [255, 255, 255],
         fontStyle: "bold",
       },
       styles: {
         fontSize: 10,
         cellPadding: 3,
       },
       columnStyles: {
         0: { cellWidth: 140 },
         1: { cellWidth: "auto", halign: "right" }, // Align Body Numbers to Right
       },
       didParseCell: function (data) {
         // ✅ NEW: Force "Amount" Header to align Right
         if (data.section === "head" && data.column.index === 1) {
           data.cell.styles.halign = "right";
         }

         // Existing logic for Total Row background
         if (data.row.index === tableRows.length - 1) {
           data.cell.styles.fillColor = [249, 250, 251];
           data.cell.styles.lineWidth = { top: 0.5 };
           data.cell.styles.lineColor = [200, 200, 200];
         }
       },
     });

      // --- 6. Footer ---
      const finalY = doc.lastAutoTable.finalY + 30;

      // Terms
      doc.setFontSize(9);
      doc.setTextColor(150);
      doc.text("Terms & Conditions:", 14, finalY);
      doc.text(
        "Payment is due upon receipt. Thank you for choosing NextInn.",
        14,
        finalY + 5
      );

      // Brand Footer Bar
      doc.setFillColor(249, 115, 22); // Sunset Orange
      doc.rect(0, 285, 210, 15, "F"); // Bottom bar

      // Save
      doc.save(`Invoice_${booking.bookingId}.pdf`);
    };

  return (
    <>
      {currentList.length === 0 ? (
        <div className="current-list-no_booking">
          <Clock size={48} className="mb-4 opacity-20" />
          <p>No{activeTab} booking found..</p>
        </div>
      ) : (
        <div className="current-list-bookings">
          {currentList.map((booking) => (
            <div
              key={booking._id}
              className={`current-list-booking ${expandId === booking._id ? "current-list-booking-expand" : "current-list-booking-hover"}`}
            >
              <div
                className="current-list-booking-header"
                onClick={() => toggleExpand(booking._id)}
              >
                <div className="current-list-left">
                  <div
                    className={`p-3 rounded-full ${booking.bookingStatus === "confirmed" ? "bg-green-50 text-green-600" : "bg-orange-50 text-orange-600"}`}
                  >
                    {booking.bookingStatus === "confirmed" ? (
                      <CheckCircle size={24} />
                    ) : (
                      <Clock size={24} />
                    )}
                  </div>
                  <div>
                    <h3 className="current-list-left-title">
                      {booking.category?.name}
                    </h3>
                    <div className="current-list-left-info">
                      <Calendar size={14} />
                      <span>
                        {format(new Date(booking.checkIn), "MMM dd")} -{" "}
                        {format(new Date(booking.checkOut), "MMM dd, yyyy")}
                      </span>
                      <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                      <span>Booking Id: {booking.bookingId}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div
                    className={`current-list-right-text ${activeTab === "archive" ? "current-list-right-text-inactive" : ""}`}
                  >
                    ₹{booking.totalAmount.toLocaleString()}
                  </div>
                  <div
                    className={`current-list-right-payment ${booking.paymentStatus === "paid" ? "text-green-600" : "text-orange-500"}`}
                  >
                    {activeTab === "archive"
                      ? booking.bookingStatus
                      : booking.paymentStatus}
                  </div>
                </div>
              </div>

              {/* expanded section */}
              {expandId === booking._id && (
                <div className="booking-expand">
                  <div className="booking-expand-grid">
                    {/* column 1: Guest & Room Details */}
                    <div>
                      <h4 className="booking-expand-stay-details">
                        Stay Details
                      </h4>
                      <ul className="booking-expand-stay-lists">
                        <li className="booking-expand-stay-list">
                          <span className="flex items-center gap-2">
                            <Users size={14} /> Guests
                          </span>
                          <span className="font-medium">
                            {booking.guestDetails.adults} Adults,{" "}
                            {booking.guestDetails.children} Kids
                          </span>
                        </li>
                        <li className="booking-expand-stay-list">
                          <span className="flex items-center gap-2">
                            <Home size={14} /> Rooms
                          </span>
                          <span className="font-medium">
                            {booking.guestDetails.roomsCount} Rooms
                          </span>
                        </li>
                        <li className="booking-expand-stay-list">
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
                      <h4 className="booking-expand-finance-title">
                        Payment Breakdown
                      </h4>
                      <div className="booking-expand-finance">
                        <div className="booking-expand-finance-charge-title">
                          <span>Base Charge / Night</span>
                          <span>
                            ₹
                            {booking.priceBreakdown.baseRoomCharge.toLocaleString()}
                          </span>
                        </div>

                        {Number(booking.priceBreakdown.baseRoomCharge) <
                          Number(booking.totalAmount) && (
                          <div className="booking-expand-finance-charge-title">
                            <span>Add-ons Total</span>
                            <span>
                              ₹
                              {(
                                Number(booking.totalAmount) -
                                Number(booking.priceBreakdown.baseRoomCharge)
                              ).toLocaleString()}
                            </span>
                          </div>
                        )}

                        <div className="booking-expand-finance-charge-total-title">
                          <span>Grand Total</span>
                          <span>₹{booking.totalAmount.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Action Buttons */}
                  <div className="booking-expand-download">
                    <button
                      className="booking-expand-download-btn"
                      onClick={() => handleDownloadInvoice(booking)}
                    >
                      <Download size={16} /> Download Invoice
                    </button>
                  </div>
                </div>
              )}
              <div
                className="bg-gray-50 p-1 flex justify-center cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => toggleExpand(booking._id)}
              >
                {expandId === booking._id ? (
                  <ChevronUp size={16} className="text-gray-400" />
                ) : (
                  <ChevronDown size={16} className="text-gray-400" />
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default BookingList;
