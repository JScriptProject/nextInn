import mongoose from "mongoose";
import bcrypt from "bcrypt";

const adminSchema = new mongoose.Schema({
    name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role:{
    type:String,
    enum:["admin", "superadmin"],
    default:"admin"
  }},{timestamps:true}
)

adminSchema.pre("save", async function(next){
  try {
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    return next();
  } catch (error) {
    return next(error);
  }
});

export const Admin = mongoose.model("Admin", adminSchema);                                                                     