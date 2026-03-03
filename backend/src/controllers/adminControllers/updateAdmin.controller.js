import { asyncHandler } from "#utils/asyncHandler.js";
import { Admin } from "#models/admin.model.js";
import { ApiError } from "#utils/ApiError.js";
import { createAuditLog } from "#utils/auditLogger.js";

const updateAdmin = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  if (!name && !email) {
    throw new ApiError(400, "At least one field (name or email) is required");
  }

  const admin = await Admin.findById(id);

  if (!admin) {
    throw new ApiError(404, "Admin not found");
  }
  
  if (admin.role === "superadmin") {
    throw new ApiError(403, "Cannot update a superadmin");
  }

  if (email && email !== admin.email) {
    const existedAdmin = await Admin.findOne({ email });
    if (existedAdmin) {
      throw new ApiError(409, "Email already in use");
    }
    admin.email = email;
  }

  if (name) {
    admin.name = name;
  }

  await admin.save({ validateBeforeSave: false });

  const updatedAdmin = await Admin.findById(id).select("-password");

  createAuditLog(
    req.admin.userId,
    "UPDATE",
    "Admins",
    `Updated admin which is linked with email - ${adminEmail} `,
  );

  return res.success(200, updatedAdmin, "Admin updated successfully");
});

export { updateAdmin };
