import bcrypt from "bcrypt";
import { config } from "dotenv";
import jwt from "jsonwebtoken";

import User from "../../models/user.js";
import AccessToken from "../../models/AccessToken.js";
config();

const login = async (req, res) => {
  const { email, password: inputPassword } = req.body;
  const user = await findUser(email);
  !user && invalidUsernameOrPassword();
  const isValidPassword = validatePassword(inputPassword, user.password);
  !isValidPassword && invalidUsernameOrPassword();
  const tokens = [];
  if (isValidPassword) {
    const payload = {
      sub: `${user.firstName} ${user.surname}`,
      roles: user.roles,
    };
    const [accessToken, refreshToken] = createTokens(payload);
    tokens.push({ accessToken });
    tokens.push({ refreshToken });
  }
  try {
    await persistAccessToken(tokens[0].accessToken);
  } catch (error) {
    res.status(500).send({ message: "Could not persist token", error });
    return;
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
    user = await User.findOne({ email: email });
  } catch {
    throw new Error("Database Error");
  } finally {
    return user;
  }
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
