import express from "express";

import registerUser from "../controllers/Auth/registerUser.js";
import login from "../controllers/Auth/login.js";
import registerValidationMiddleware from "../middlewares/registerValidation.js";
import loginValidationMiddleware from "../middlewares/loginValidation.js";
const router = express.Router();

router.post("/user-registration", registerValidationMiddleware, registerUser);
router.post("/login", loginValidationMiddleware, login);

export default router;
