import { Router } from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
import {
	allplaylists,
	create,
	remove,
} from "../controllers/playlist.controller.js";

const router = Router();

console.log("Playlist route hitted");

router.use(verifyToken);

router.route("/getallplaylists").get(allplaylists);
router.route("/create").post(create);
router.route("/delete/:id").delete(remove);

export default router;
