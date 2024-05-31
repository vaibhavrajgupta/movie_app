import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

export const verifyToken = asyncHandler(async (req, res, next) => {
	try {

		const token = req.cookies.token;


		if (!token) throw new ApiError(401, "Unauthorized request");

		jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
			if (err) throw new ApiError(401, "Invalid Token Access");
			req.userId = payload.id;
			next();
		});
	} catch (error) {
		console.error("Token verification error:", error);
		throw new ApiError(401, error?.message || "Invalid access token");
	}
});
