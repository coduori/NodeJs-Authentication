import bcrypt from "bcrypt";
import User from "../../models/user.js";
import asyncHandler from "express-async-handler";
//@desc   Register a new user
//@route  POST /auth/user-registration
//@access   Open
const registerUser = asyncHandler(async (req, res) => {
  const { email, password, firstName, surname, roles } = req.body;
  let userId;
  const hashedPassword = hashPassword(password);
  const newUser = {
    email,
    password: hashedPassword,
    firstName: firstName.trim(),
    surname: surname.trim(),
  };
  if (roles) {
    newUser.roles = roles;
  }

  userId = persistToDB(newUser);

  res.status(200).send({ user: userId, email });
});
const hashPassword = password => {
  return bcrypt.hashSync(password, 5);
};

const persistToDB = asyncHandler(async user => {
  const newUser = new User(user);
  const newUserId = await newUser.save();

  return newUserId._id;
});

export { hashPassword };
export default registerUser;
