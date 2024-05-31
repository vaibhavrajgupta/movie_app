import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
	cors({
		origin: process.env.CLIENT_URL,
		credentials: true,
	})
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

import authRoute from "./routes/auth.route.js";
import playlistRoute from "./routes/playlist.route.js";
import movieRoute from "./routes/movie.route.js";

app.use("/api/auth", authRoute);
app.use("/api/playlist", playlistRoute);
app.use("/api/movie", movieRoute);

export default app;
