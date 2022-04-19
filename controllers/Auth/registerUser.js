import bcrypt from "bcrypt";
import User from "../../models/user.js";
const registerUser = async (req, res) => {
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

  try {
    userId = await persistToDB(newUser);
  } catch {
    res.status(500).send({ message: "Unable to create user." });
    return;
  }
  res.status(200).send({ user: userId, email });
};
const hashPassword = password => {
  return bcrypt.hashSync(password, 5);
};

const persistToDB = async user => {
  const newUser = new User(user);
  let newUserId;
  try {
    newUserId = await newUser.save();
  } catch (error) {
    throw new Error(error);
  }
  return newUserId._id;
};

export { hashPassword };
export default registerUser;
