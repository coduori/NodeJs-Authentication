import bcrypt from "bcrypt";
import User from "../../models/user.js";
//ToDo: user express-validator to sanitize input
const registerUser = async (req, res) => {
  const { email, password, firstName, surname, roles } = req.body;
  const isValidEmail = validateEmail(email);
  const isValidPassword = validatePassword(password);
  let userId;
  if (!isValidEmail || !isValidPassword || !firstName || !surname) {
    res.status(400).send({ message: "Unacceptable input parameters" });
    return;
  }
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
const validateEmail = email => {
  const regExEmail = /^([A-Za-z0-9_\-.+])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,})$/;
  if (!email) {
    return false;
  }
  if (email.trim().length < 5) {
    return false;
  }
  return regExEmail.test(email);
};
const validatePassword = password => {
  if (!password) {
    return false;
  }
  if (password.trim().length <= 5) {
    return false;
  }
  return true;
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

export { validateEmail, validatePassword, hashPassword };
export default registerUser;
