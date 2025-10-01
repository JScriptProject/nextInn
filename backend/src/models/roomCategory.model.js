
import mongoose from "mongoose";

const roomCategorySchema = new mongoose.Schema(
  {
    categoryId: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    location: {
      type: String,
      required: true,
      unique: true,
    },
    price: {
      type: Number,
      required: true,
    },
    info: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 500,
    },
    description: {
      type: String,
      required: true,
      minlength: 50,
      maxlength: 1000,
    },
    roomCapacity: {
      adults: {
        type: Number,
        required: true,
        min: 2,
      },
      children: {
        type: Number,
        required: true,
        min: 1,
      },
      availableRooms: {
        type: Number,
        required: true,
        min: 1,
      },
      bed: {
        type: Number,
        required: true,
        min: 1,
      },
      maxExtraAdults: {
        type: Number,
        required: true,
        min: 0,
      },
      maxExtraChildren: {
        type: Number,
        required: true,
        min: 0,
      },
      maxExtraBed: {
        type: Number,
        required: true,
        min: 0,
      },
      extraAdultCharges: {
        type: Number,
        required: true,
      },
      extraChildCharges: {
        type: Number,
        required: true,
      },
      extraBedCharge: {
        type: Number,
        required: true,
      },
    },
    addonServicesCharges: {
      petFriendly: {
        type: Number,
        required: true,
      },
      steamRoom: {
        type: Number,
        required: true,
      },
      laundry: {
        type: Number,
        required: true,
      },
    },
    bannerImg: {
      type: String,
      required: true,
    },
    roomImages: [
      {
        type: String,
        required: true,
      },
    ],
    features: [
      {
        icon: {
          type: String,
          required: true,
        },
        text: {
          type: String,
          required: true,
        },
      },
    ],
    amenities: [
      {
        icon: {
          type: String,
          required: true,
        },
        text: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

export const RoomCategory = mongoose.model("RoomCategory", roomCategorySchema);
