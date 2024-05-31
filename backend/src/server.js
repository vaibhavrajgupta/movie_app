import dotenv from "dotenv";
import connectToDB from "./config/db.config.js";
import app from "./app.js";
import http from "http";

dotenv.config({
	path: "./.env",
});

const port = process.env.PORT;
const server = http.createServer(app);

connectToDB()
	.then(() => {
		server.listen(port || 7000, () => {
			console.log("Server is running at port : " + port);
		});
	})
	.catch((error) => {
		console.log("Error occured while setting up the server !!!! ", error);
	});
