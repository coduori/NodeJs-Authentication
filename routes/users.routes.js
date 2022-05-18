import express from "express";

import Authorization from "../middleware/Authorization.js";
import Users from "../controllers/users.js";
const router = express.Router();

router.get("/", Authorization, Users);
export default router;
