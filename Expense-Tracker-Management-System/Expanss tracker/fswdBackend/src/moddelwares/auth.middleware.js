import { asyncHandler } from "../utils/asyncHeandler.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.models.js";
import { ApiResponce } from "../utils/ApiResponce.js";

const verifyJWT = asyncHandler(async (req, _, next) => {
    try {
        const token = req.cookies?.accessToken || req.headers("Authorization")?.replace("Bearer", "")
    
        if (!token) {
            throw new ApiError(401, "Unauthorized access");
        }
    
        try {
            const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            const user = await User.findById(decodedToken?._id).select("-password -refreshToken");
    
            if (!user) {
                throw new ApiError(401, "Invalid token or user not found");
            }
            req.user = user;
            next();
        } catch (tokenError) {
            if (tokenError.name === 'JsonWebTokenError') {
                throw new ApiError(401, "Invalid token");
            }
            if (tokenError.name === 'TokenExpiredError') {
                throw new ApiError(401, "Token has expired");
            }
            throw tokenError;
        }
    } catch (error) {
        throw new ApiError(401, error?.message || "Authentication failed");
    }
});

export { verifyJWT };