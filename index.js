import { config } from "dotenv";
import express from "express";

import routes from "./routes/routes.js";
import { errorHandler } from "./middleware/errorMiddleware.js";
import connect from "./config/db.js";

config();
connect();
const app = express();
const serverPort = process.env.SERVER_PORT;

app.use(express.json());
app.use(routes);
app.use(errorHandler);
app.listen(serverPort);
