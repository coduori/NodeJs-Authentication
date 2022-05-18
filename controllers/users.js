import User from "../models/user.js";
import asyncHandler from "express-async-handler";
//@desc     list all users
//@route    GET /users
//@access   Protected
const Users = asyncHandler(async (req, res) => {
  const users = await fetchUsers();

  res.status(200).send({ users });
});
const fetchUsers = asyncHandler(async () => {
  return await User.find();
});
export default Users;
