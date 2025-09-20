import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    bannerImg: {
      type: String,
      required: true,
    },
    roomImgs: {
      type: [String],
      required: true,
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);

//creat password hashing by using the middleware of the mongoose

userSchema.pre("save", async (next) => {
  if (!this.ismodified("password")) return next();

  this.passowrd = await bcrypt.hash(this.password, 10);
});

//create a custom method to check is password is correct

userSchema.methods.isPaswordCorrect = async (passowrd) => {
  return await bcrypt.compare(passowrd, this.passowrd);
};

// create a access token

userSchema.methods.createAccessToken = () => {
  jwt.sign(
    {
      _id: this.id,
      email: this.email,
      name: this.name,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );
};

// create a refresh token

userSchema.methods.createRefreshToken = () => {
  jwt.sign(
    {
      _id: this.id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
  );
};
