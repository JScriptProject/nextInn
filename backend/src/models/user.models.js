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




//creat password hashing by using the middleware of the mongoose

userSchema.pre("save", async function(next){
  try {
    if (!this.isModified("password")) return next();
    this.passowrd = await bcrypt.hash(this.password, 10);
    return next();
  } catch (error) {
    return next(error);
  }
  
});


//create a custom method to check is password is correct
userSchema.methods.isPaswordCorrect = async function(password){
  return await bcrypt.compare(password, this.password);
};

// create a access token
userSchema.methods.createAccessToken = function(){
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      name: this.name,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );
};

// create a refresh token

userSchema.methods.createRefreshToken = function(){
 return  jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
  );
};


export const User = mongoose.model("User", userSchema);