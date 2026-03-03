import mongoose from "mongoose";

const logSchema = new mongoose.Schema(
  {
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },
    module: {
      type: String,
      enum: ["Rooms", "Auth", "Categories", "Bookings", "Reviews", "Admins"],
      required: true,
    },
    actionType: {
      type: String,
      enum: ["CREATE", "UPDATE", "DELETE", "AUTH"],
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

//database indexes

logSchema.index({ createdAt: -1 });

logSchema.index({ module: 1 });
logSchema.index({ admin: 1 });

export const Log = mongoose.model("Log", logSchema);
