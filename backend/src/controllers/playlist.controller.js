import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Playlist } from "../models/playlist.model.js";

export const allplaylists = asyncHandler(async (req, res) => {
	try {
		const userId = req.userId;
		const playlists = await User.findById(userId).populate("playlists");

		return res
			.status(200)
			.json(
				new ApiResponse(
					200,
					playlists.playlists,
					"All playlists retrieved successfully !!!!"
				)
			);
	} catch (error) {
		throw new ApiError(
			500,
			"Something went wrong while fetching the playlists!!!"
		);
	}
});

export const create = asyncHandler(async (req, res) => {
	try {
		const { name } = req.body;
		const userId = req.userId;

		const newPlaylist = await Playlist.create({
			name: name,
			movies: [],
			owner: userId,
		});

		const user = await User.findById(userId);
		user.playlists.push(newPlaylist._id);
		await user.save();

		return res
			.status(201)
			.json(
				new ApiResponse(201, newPlaylist, "Playlist created successfully.....")
			);
	} catch (error) {
		throw new ApiError(
			500,
			"Something went wrong while creating the playlist...."
		);
	}
});

export const remove = asyncHandler(async (req, res) => {
	try {
		const playlistId = req.params.id;
		const playlist = await Playlist.findByIdAndDelete(playlistId);

		if (!playlist) throw new ApiError(404, "Playlist not found !!!!1");

		

		return res
			.status(200)
			.json(
				new ApiResponse(200, playlist, "Playlist deleted successfully!!!!")
			);
	} catch (error) {
		throw new ApiError(
			500,
			"Something went wrong while deleting the playlist !!!!!"
		);
	}
});
