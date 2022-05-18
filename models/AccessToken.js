import mongoose from "mongoose";

const AccessTokenSchema = new mongoose.Schema(
  {
    token: { type: String, unique: true },
  },
  {
    timestamps: true,
  }
);
const AccessToken = mongoose.model("accesstokens", AccessTokenSchema);
export default AccessToken;
