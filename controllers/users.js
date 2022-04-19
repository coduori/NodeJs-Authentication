import User from "../models/user.js";
const Users = async (req, res) => {
  const users = await fetchUsers();

  res.status(200).send({ users });
};
const fetchUsers = async () => {
  return await User.find();
};
export default Users;
