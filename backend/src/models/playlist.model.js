import mongoose, { Schema } from "mongoose";

const playlistSchema = new Schema({
	name: {
		type: String,
		required: true,
		trim: true,
		unique: true,
		lowercase: true,
	},
	movies: [],
	owner: {
		type: Schema.Types.ObjectId,
		ref: "User",
	},
});

export const Playlist = mongoose.model("Playlist", playlistSchema);
