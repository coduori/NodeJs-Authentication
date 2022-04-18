import { config } from "dotenv";
import express from "express";
import mongoose from "mongoose";

import routes from "./routes/routes.js";

const app = express();
config();

const hostname = process.env.MONGODB_HOSTNAME;
const port = process.env.MONGODB_PORT;
const dbName = process.env.MONGODB_DBNAME;
const DB_URI = `mongodb://${hostname}:${port}/${dbName}`;

app.use(express.json());

app.use(routes);

mongoose
  .connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    connectTimeoutMS: 5000,
    socketTimeoutMS: 30000,
  })
  .then(app.listen(process.env.SERVER_PORT))
  .catch(error =>
    console.log(`Could not start server.
    Reason: Unable to connect to the database.
        Error: ${error}`)
  );
