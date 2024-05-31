import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Playlist } from "../models/playlist.model.js";

export const getmovies = asyncHandler(async (req, res) => {
	try {
		const playlistId = req.params.id;

		const playlist = await Playlist.findById(playlistId).select('movies');
		if (!playlist) {
			throw new ApiError(404, "Playlist not found");
		}

		return res
			.status(200)
			.json(
				new ApiResponse(
					200,
					playlist.movies,
					"All movies retrieved successfully!"
				)
			);
	} catch (error) {
		console.error(`Error fetching movies: ${error.message}`);
		throw new ApiError(
			500,
			"Something went wrong while fetching the movies."
		);
	}
});


export const add = asyncHandler(async (req, res) => {
	const {playlistId, movieId} = req.params;

	if (!movieId) {
		throw new ApiError(400, "Missing required fields");
	}
	try {
		const playlist = await Playlist.findById(playlistId);
		if (!playlist) {
			throw new ApiError(404, "Playlist not found");
		}


        playlist.movies.push(movieId);
        await playlist.save();

        return res.status(201).json(new ApiResponse(201, movieId, "Movie added successfully"));
	} catch (error) {
        console.error(`Error adding movie: ${error.message}`);
        throw new ApiError(500, "Something went wrong while adding the movie");
    }
});

export const omit = asyncHandler(async (req, res) => {
    const playlistId = req.params.playlistId;
    const imdbID = req.params.imdbID;

    try {
        const playlist = await Playlist.findById(playlistId);
        if (!playlist) {
            throw new ApiError(404, "Playlist not found");
        }

        // Find the index of the movie object with the matching imdbID
        const index = playlist.movies.findIndex(movie => movie.imdbID === imdbID);
        if (index === -1) {
            throw new ApiError(404, "Movie not found in playlist");
        }

        // Remove the movie object from the playlist's movies array
        playlist.movies.splice(index, 1);
        await playlist.save();

        return res.status(200).json(new ApiResponse(200, null, "Movie removed from playlist successfully"));

    } catch (error) {
        console.error(`Error removing movie: ${error.message}`);
        throw new ApiError(500, "Something went wrong while removing the movie from playlist");
    }
});

