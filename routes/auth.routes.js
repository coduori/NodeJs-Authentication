import express from "express";

import registerUser from "../controllers/Auth/registerUser.js";
import login from "../controllers/Auth/login.js";
const router = express.Router();

router.post("/user-registration", registerUser);
router.post("/login", login);

export default router;
