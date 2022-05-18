import mongoose from "mongoose";

const user = new mongoose.Schema(
  {
    firstName: { type: String, required: true, uppercase: true },
    surname: { type: String, required: true, uppercase: true },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    roles: {
      type: Array,
      required: true,
      default: ["ORDINARY_MEMBER"],
    },
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model("users", user);
export default User;
