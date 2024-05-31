import { Router } from "express";
import { signin, signup, logout } from "../controllers/auth.controller.js";

const router = Router();

router.route("/signup").post(signup);
router.route("/signin").post(signin);
router.route("/logout").post(logout);

export default router;
