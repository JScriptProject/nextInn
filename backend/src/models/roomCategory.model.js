import { max, min } from "date-fns";
import mongoose from "mongoose";

const roomCategorySchema = new mongoose.Schema(
  {
    code: {
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
      minlength: 20,
      maxlength: 500,
    },
    description: {
      type: String,
      required: true,
      minlength: 100,
      maxlength: 1000,
    },
    capacity: {
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
      available_rooms: {
        type: Number,
        required: true,
        min: 1,
      },
      bed: {
        type: String,
        required: true,
        min: 1,
      },
      max_extra_adults: {
        type: Number,
        required: true,
        min: 0,
      },
      max_extra_children: {
        type: Number,
        required: true,
        min: 0,
      },
      max_extra_bed: {
        type: Number,
        required: true,
        min: 0,
      },
      max_extra_adults_price: {
        type: Number,
        required: true,
      },
      max_extra_children_price: {
        type: Number,
        required: true,
      },
      max_extra_bed_price: {
        type: Number,
        required: true,
      },
    },
    addon_services_charges: {
      pet_friendly: {
        type: Number,
        required: true,
      },
      steam_room: {
        type: Number,
        required: true,
      },
      laundry: {
        type: Number,
        required: true,
      },
    },
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
