import { asyncHandler } from "#utils/asyncHandler.js";

const adminLogout = asyncHandler(async (req, res, next) => {
    const body = req.body || {};
    
    res.success(200, "Logged out succesfully");
});

export { adminLogout };
