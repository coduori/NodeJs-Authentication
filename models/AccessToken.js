import mongoose from "mongoose";

const AccessTokenSchema = new mongoose.Schema({
  token: String,
});
const AccessToken = mongoose.model("accessTokens", AccessTokenSchema);
export default AccessToken;
