import { Router } from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { getmovies, add, omit } from "../controllers/movie.controller.js";

const router = Router();

router.use(verifyToken);

router.route("/:id").get(getmovies);
router.route("/:playlistId/:movieId").post(add);
router.route("/:playlistId/:movieId").delete(omit);

export default router;
