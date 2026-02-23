import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
  {
    roomNumber: {
      type: String,
      required: true,
      unique: true,
    },
    floor: {
      type: Number,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RoomCategory",
      required: true,
    },
    status: {
      type: String,
      enum: ["available", "maintenance", "checked-in"],
      default: "available",
    },
    cleaning_status: {
      type: String,
      enum: ["clean", "dirty", "in-progress"],
      default: "clean",
    },
    current_guest: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    current_booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      default: null,
    },
  },
  { timestamps: true },
);

roomSchema.pre("validate", function (next) {
  if (this.status === "checked-in") {
    if (!this.current_booking || !this.current_guest) {
      this.invalidate(
        "status",
        "A Checked-In room must have current_guest and current_booking",
      );
    }
  } else {
    this.current_booking = null;
    this.current_guest = null;
  }

  next();
});
roomSchema.pre(/^find/, function (next) {
  this.populate([
    { path: "current_guest", select: "firstname lastname email mobile city" },{path:"category", select:"name"}
    
  ]);
  next();
});
export const Room = mongoose.model("Room", roomSchema);
