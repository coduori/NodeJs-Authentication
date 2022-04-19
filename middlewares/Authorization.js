import jwt from "jsonwebtoken";
import AccessToken from "../models/AccessToken.js";
import { config } from "dotenv";
config();
const USERS = "/users";
const REFRESH = "/refresh";
const Authorization = (req, res, next) => {
  const requestedResource = req.originalUrl;
  const authorization = req.headers["authorization"] || "";
  const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
  const token = authorization.split(" ")[1];
  let tokenExists;
  let decoded;
  try {
    tokenExists = findToken(token);
  } catch {
    res.status(500).send({ message: "could not fetch access token" });
    return;
  }
  if (!tokenExists) {
    res.status(403).status({ message: "invalid access token" });
    return;
  }
  try {
    decoded = jwt.verify(token, accessTokenSecret, { complete: true });
  } catch (error) {
    res.status(403).send({ error: error.message });
    return;
  }
  if (requestedResource === USERS) {
    const roles = decoded.payload.roles;
    if (roles.includes("ORDINARY_MEMBER")) {
      next();
      return;
    }
    res.status(300).send({ message: "unauthorized route" });
    return;
  }
  res.status(300).send({ message: "unauthorized route" });
};
const findToken = async token => {
  try {
    const exists = await AccessToken.find({ token });
    if (exists) {
      return true;
    }
  } catch {
    throw new Error("Invalid Access Token");
  }

  return false;
};
export default Authorization;
