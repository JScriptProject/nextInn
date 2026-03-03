import { asyncHandler } from "#utils/asyncHandler.js";
import { Admin } from "#models/admin.model.js";
import { ApiError } from "#utils/ApiError.js";
import { createAuditLog } from "#utils/auditLogger.js";

const deleteAdmin = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const admin = await Admin.findById(id);
 console.log("ADMIN=>", admin)
  if (!admin) {
    throw new ApiError(404, "Admin not found");
  }

  if (admin.role === "superadmin") {
    throw new ApiError(403, "Cannot delete a superadmin");
  }
  const adminEmail = admin?.email;
  await admin.deleteOne();
 
  createAuditLog(
    req.admin.userId,
    "DELETE",
    "Admins",
    `Superadmin deleted admin which was linked with ${adminEmail} `,
  );
  return res.success(200, {}, "Admin deleted successfully");
});

export { deleteAdmin };
