import jwt from "jsonwebtoken";
import AccessToken from "../models/AccessToken.js";
import { config } from "dotenv";
import asyncHandler from "express-async-handler";
config();
const USERS = "/users";
const REFRESH = "/auth/refresh";
const Authorization = (req, res, next) => {
  const requestedResource = req.originalUrl;
  const authorization = req.headers["authorization"] || "";
  const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
  const token = authorization.split(" ")[1];
  let tokenExists;
  let decoded;
  if (requestedResource === REFRESH) {
    try {
      const newAccessToken = refreshAccessToken(token, accessTokenSecret);
    } catch {
      return res.status(400).send({ message: "could not verify access token" });
    }
  }
  try {
    tokenExists = findToken(token);
  } catch {
    return res.status(500).send({ message: "could not fetch access token" });
  }
  if (!tokenExists) {
    return res.status(403).status({ message: "invalid access token" });
  }
  try {
    decoded = jwt.verify(token, accessTokenSecret, { complete: true });
  } catch (error) {
    return res.status(403).send({ error: error.message });
  }
  if (requestedResource === USERS) {
    console.log(decoded.payload.roles);
    const roles = decoded.payload.roles;
    if (roles.includes("ORDINARY_MEMBER")) {
      return next();
    }
    return res.status(300).send({ message: "unauthorized route" });
  }

  res.status(300).send({ message: "unauthorized route" });
};
const findToken = asyncHandler(async token => {
  try {
    const exists = await AccessToken.find({ token });
    if (exists) {
      return true;
    }
  } catch {
    throw new Error("Invalid Access Token");
  }

  return false;
});
const refreshAccessToken = (token, secret) => {
  let payload;
  try {
    payload = jwt.verify(token, secret, { ignoreExpiration: true });
  } catch (error) {
    throw new Error(error);
  }
  newToken = jwt.sign(payload, secret, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
  });
  try {
    persistAccessToken(newToken);
    deleteExpiredToken(token);
  } catch {
    return { newToken: null };
  }
};
const persistAccessToken = async token => {
  const newToken = new AccessToken({ token });

  try {
    await newToken.save();
  } catch (error) {
    throw new Error({ message: "Could not persist token", error });
  }
};
const deleteExpiredToken = async token => {
  try {
    AccessToken.findOneAndDelete({ token });
  } catch {
    return false;
  }
  return true;
};
export default Authorization;
