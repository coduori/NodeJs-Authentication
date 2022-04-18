import bcrypt from "bcrypt";
import { config } from "dotenv";
import jwt from "jsonwebtoken";

import User from "../../models/user.js";

config();

const response = { statusCode: 200, message: null };

const login = async (req, res) => {
  const { email, password: inputPassword } = req.body;
  const user = await findUser(email);
  !user && invalidUsernameOrPassword();
  const isValidPassword = validatePassword(inputPassword, user.password);
  !isValidPassword && invalidUsernameOrPassword();
  const tokens = [];
  if (isValidPassword) {
    const payload = {
      sub: user.email,
      roles: user.roles,
    };
    const [accessToken, refreshToken] = createTokens(payload, email);
    tokens.push({ accessToken });
    tokens.push({ refreshToken });
  }
  try {
    await persistAccessToken(acessToken);
  } catch {
    res.status(500).send({ message: "Could not persist token" });
  }
  res.status(200).send({ tokens });
};
const persistAccessToken = async token => {};
const invalidUsernameOrPassword = () => {
  response.statusCode = 400;
  response.message = "invalid username or password!";
};
const validatePassword = (inputPassword, validPassword) => {
  const isValid = bcrypt.compareSync(inputPassword, validPassword);
  return isValid;
};
const findUser = async email => {
  let user;
  try {
    user = await User.findOne({ email: email });
  } catch (error) {
    throw new Error("Database Error");
  } finally {
    return user;
  }
};
const createTokens = userRoles => {
  const role = userRoles;
  const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
  const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
  const accessTokenExp = process.env.ACCESS_TOKEN_EXPIRY;
  const refreshTokenExp = process.env.REFRESH_TOKEN_EXPIRY;
  const accessToken = jwt.sign(role, accessTokenSecret, {
    expiresIn: accessTokenExp,
  });
  const refreshToken = jwt.sign(role, refreshTokenSecret, {
    expiresIn: refreshTokenExp,
  });

  return [accessToken, refreshToken];
};
export { createTokens, validatePassword, invalidUsernameOrPassword };
export default login;
