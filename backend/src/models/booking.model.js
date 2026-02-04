import mongoose, { Mongoose } from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    assignedRooms: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room",
      },
    ],
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RoomCategory",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    checkIn: {
      type: Date,
      required: true,
    },
    checkOut: {
      type: Date,
      required: true,
    },

    bookingStatus: {
      type: String,
      enum: ["confirmed", "cancelled", "checked-in", "checked-out"],
      default: "confirmed",
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded"],
      default: "pending",
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    // 3. Guest Details (Matches your form inputs)
    guestDetails: {
      adults: { type: Number, required: true },
      children: { type: Number, default: 0 },
      roomsCount: { type: Number, required: true },
      extraBed: { type: Number, default: 0 },
    },
    // 4. Extra Services (Matches your checkboxes)
    // Best Practice: Store 'true/false' here. The price is already calculated in totalAmount.
    priceBreakdown: {
      baseRoomCharge: { type: Number, required: true }, // Rate * Nights * Rooms
      extraGuestCharges: {
        onlyRoom: { type: Number},
        adults: { type: Number, default: 0 }, // e.g., ₹1000
        children: { type: Number, default: 0 }, // e.g., ₹500
        extraBed: { type: Number, default: 0 }, // e.g., ₹0
        addonRooms: { type: Number, default: 0 },
      },
      addonServicesCharges: {
        petFriendly: { type: Number, default: 0 }, // e.g., ₹550
        steamRoom: { type: Number, default: 0 }, // e.g., ₹0
        laundry: { type: Number, default: 0 }, // e.g., ₹145
      },
    },
  },
  { timestamps: true },
);

// 2. Add this pre-save middleware
bookingSchema.pre("save", function (next) {
  // 'this' refers to the booking document being saved
  if (this.priceBreakdown && this.priceBreakdown.baseRoomCharge) {
    // Only set it if it hasn't been manually provided already
    if (!this.priceBreakdown.extraGuestCharges.onlyRoom) {
      this.priceBreakdown.extraGuestCharges.onlyRoom = this.priceBreakdown.baseRoomCharge;
    }
  }
  next();
});

export const Booking = mongoose.model("Booking", bookingSchema);
