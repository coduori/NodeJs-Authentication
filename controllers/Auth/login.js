import bcrypt from "bcrypt";
import { config } from "dotenv";
import jwt from "jsonwebtoken";

import User from "../../models/user.js";
import AccessToken from "../../models/AccessToken.js";
config();
<<<<<<< HEAD
//@desc   login an existing user
//@route  POST /auth/login
=======

>>>>>>> modified token payload
const login = async (req, res) => {
  const { email, password: inputPassword } = req.body;
  let user;
  try {
    user = await findUser(email);
  } catch (error) {
    return res.status(400).send({ error });
  }
  const isValidPassword = validatePassword(inputPassword, user.password);
  const tokens = [];
  if (!isValidPassword) {
    return res.status(400).send({ message: "invalid username or password" });
  }
  if (isValidPassword) {
    const payload = {
      sub: `${user.firstName} ${user.surname}`,
      roles: user.roles,
    };
<<<<<<< HEAD

=======
>>>>>>> modified token payload
    const [accessToken, refreshToken] = createTokens(payload);
    tokens.push({ accessToken });
    tokens.push({ refreshToken });
  }
  try {
    await persistAccessToken(tokens[0].accessToken);
  } catch (error) {
<<<<<<< HEAD
    return res.status(500).send({ message: "Could not persist token", error });
=======
    res.status(500).send({ message: "Could not persist token", error });
    return;
>>>>>>> modified token payload
  }
  res.status(200).send({ tokens });
};
const persistAccessToken = async token => {
  const newToken = new AccessToken({ token });

  try {
    await newToken.save();
  } catch (error) {
    throw new Error({ message: "Could not persist token", error });
  }
};

const validatePassword = (inputPassword, validPassword) => {
  const isValid = bcrypt.compareSync(inputPassword, validPassword);
  return isValid;
};
const findUser = async email => {
  let user;
  try {
<<<<<<< HEAD
    user = await User.findOne("email: email");
=======
    user = await User.findOne({ email: email });
>>>>>>> modified token payload
  } catch {
    throw new Error("Database Error");
  }
  return user;
};
const createTokens = data => {
  const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
  const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
  const accessTokenExp = process.env.ACCESS_TOKEN_EXPIRY;
  const refreshTokenExp = process.env.REFRESH_TOKEN_EXPIRY;
  const accessToken = jwt.sign(data, accessTokenSecret, {
    expiresIn: accessTokenExp,
  });
  const refreshToken = jwt.sign({ sub: data.sub }, refreshTokenSecret, {
    expiresIn: refreshTokenExp,
  });

  return [accessToken, refreshToken];
};
export { createTokens, validatePassword };
export default login;
