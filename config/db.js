import mongoose from "mongoose";
import asyncHandler from "express-async-handler";
const connect = asyncHandler(async () => {
  const hostname = process.env.MONGODB_HOSTNAME;
  const port = process.env.MONGODB_PORT;
  const dbName = process.env.MONGODB_DBNAME;
  const DB_URI = `mongodb://${hostname}:${port}/${dbName}`;
  mongoose.connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    connectTimeoutMS: 5000,
    socketTimeoutMS: 30000,
  });
});
export default connect;
