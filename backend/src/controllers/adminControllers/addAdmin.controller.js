import { asyncHandler } from "#utils/asyncHandler.js";
import { Admin } from "#models/admin.model.js";
import { ApiError } from "#utils/ApiError.js";
import {createAuditLog } from "#utils/auditLogger.js"

const addAdmin = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if ([name, email, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }
  const existedAdmin = await Admin.findOne({ email });

  if (existedAdmin) {
    throw new ApiError(409, "Admin with this email already exists");
  }

  const admin = await Admin.create({
    name,
    email,
    password,
  });

  const createdAdmin = await Admin.findById(admin._id).select("-password");

  if (!createdAdmin) {
    throw new ApiError(500, "Something went wrong while creating the admin");
  }
  createAuditLog(
    req.admin.userId,
    "CREATE",
    "Admins",
    `Superadmin created a new admin account for ${email}`,
  );
  return res.success(201, createdAdmin, "Admin created successfully");
});

export { addAdmin };
