import express from "express";

import registerUser from "../controllers/Auth/registerUser.js";
import registerValidationMiddleware from "../middleware/registerValidation.js";
import loginValidationMiddleware from "../middleware/loginValidation.js";
import AuthorizationMiddleware from "../middleware/Authorization.js";
import Users from "../controllers/users.js";
import login from "../controllers/Auth/login.js";

const router = express.Router();

router.post("/user-registration", registerValidationMiddleware, registerUser);
router.post("/login", loginValidationMiddleware, login);
router.post("/refresh", AuthorizationMiddleware, Users);

export default router;
