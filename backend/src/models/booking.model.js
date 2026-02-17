import mongoose, { Mongoose } from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    assignedRooms: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room",
      },
    ],
    bookingId:{
      type:String,
      required:true,
    },
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


//================================
// Define the state machine rules
//================================

const BOOKING_TRANSITIONS ={
  "confirmed" :["cancelled", "checked-in"],
  "checked-in" : ["checked-out"],
  "checked-out" :[],
  "cancelled" : []
}

const PAYMENT_TRANSACTONS ={
  "pending" :["paid","failed"],
  "paid" :["refunded"],
  "failed" : [],
  "refunded" : []
};

//=========================================
//  Add custom methods to enforce rules
//=========================================

// upadte the booking status
bookingSchema.methods.updateBookingStatus = function (newStatus){
  const currentStatus = this.bookingStatus;
  if(currentStatus===newStatus) return;

  const availableStatus = BOOKING_TRANSITIONS[currentStatus] || [];

  if(!availableStatus.includes(newStatus)){
    throw new Error(`Cant update the Status from ${currentStatus} to ${newStatus}`);
  }
  this.bookingStatus = newStatus
}

bookingSchema.methods.updatePaymentStatus = function (newStatus)
{
  const currentStatus = this.paymentStatus;

  if(currentStatus === newStatus) return;

  const availableStatus = PAYMENT_TRANSACTONS[currentStatus] || [];

  if(!availableStatus.includes(newStatus))
  {
    throw new Error(`Cant update the status from ${currentStatus} to ${newStatus}`);
  }
  this.paymentStatus= newStatus;
}

//====================
// My custome middlewares
//====================
bookingSchema.pre("validate", function (next) {
  const alpha = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];
  const rn = (len) =>
    Array.from({ length: len })
      .map((item) => alpha[Math.floor(Math.random() * 26)])
      .join("");

  if (!this.bookingId) {
    console.log("INSIDE+>");
    const randomBookingId = `${rn(4)}${Math.floor(Math.random() * 100)
      .toString()
      .padStart(2, "0")}${rn(3)}`;
    console.log("Booking Id =>", randomBookingId);
    this.bookingId = randomBookingId;
  }
  next();
});

bookingSchema.pre(/^find/, function(next){
  this.populate([{
    path:'user',
    select:'firstname lastname email mobile city'
  },{
    path:'category',
    select:'name location'
  },
{
  path:'assignedRooms',
  select:'',
}])
  next();
});
export const Booking = mongoose.model("Booking", bookingSchema);
