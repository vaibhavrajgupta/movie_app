import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const signup = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	if ([email, password].some((field) => field?.trim() === "")) {
		throw new ApiError(400, "All fields are required");
	}

	const existedUser = await User.findOne({
		$or: [{ email }],
	});
	if (existedUser) {
		throw new ApiError(409, "User with email or username already exists");
	}

	const user = await User.create({
		email,
		password,
	});

	const createdUser = await User.findById(user._id).select("-password");
	if (!createdUser)
		throw new ApiError(500, "Something went wrong while registering the user");

	return res
		.status(201)
		.json(new ApiResponse(200, createdUser, "User Registered Successfully"));
});

export const signin = asyncHandler(async (req, res) => {
	const { email, password } = req.body;
	if (!email) {
		throw new ApiError(400, "email is required");
	}

	const user = await User.findOne({ email });

	if (!user) {
		throw new ApiError(404, "User does not exist");
	}

	const isValidPassword = await user.isPasswordCorrect(password);

	if (!isValidPassword) throw new ApiError(401, "Invalid User Credentials....");

	const age = process.env.JWT_TOKEN_EXPIRY;

	const token = jwt.sign(
		{ id: user._id, email: user.email },
		process.env.JWT_SECRET_KEY,
		{ expiresIn: age }
	);

	const signInUser = await User.findById(user._id).select("-password");

	const options = {
		httpOnly: true,
		secure: true,
	};

	return res
		.status(200)
		.cookie("token", token, options)
		.json(
			new ApiResponse(200, { user: signInUser }, "User LoggedInn Successfully")
		);
});

export const logout = asyncHandler(async (req, res) => {
	const options = {
		httpOnly: true,
		secure: true,
	};

	console.log("Heyyyyyy");

	return res
		.status(200)
		.clearCookie("token", options)
		.json(new ApiResponse(200, {}, "User Logged Out"));
});
