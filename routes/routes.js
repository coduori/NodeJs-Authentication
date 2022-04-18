import express from "express";

import auth from "./auth.routes.js";

const router = express.Router();

router.use("/auth", auth);
router.use((req, res) => {
  res.status(404).json({
    msg: "Invalid route",
  });
});

export default router;
