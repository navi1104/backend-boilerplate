const bcrypt = require("bcrypt");
const { json } = require("express");
const User = require("../model/User");
const path = require("path");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const handleRefreshToken = async (req, res) => {
  const cookies = await req.cookies;
  
  console.log("cookies:", cookies);
  if (!cookies.jwt) return res.sendStatus(401);

  const refreshToken = cookies.jwt;

  const foundUser = await User.findOne({ refreshToken: refreshToken }).exec();
  if (!foundUser) {
    return res.status(401).json({ message: "no user found" });
  }
  console.log("foundUser:", foundUser, foundUser.refreshToken);

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    console.log("decoded:", decoded);
    if (err || decoded.username !== foundUser.username)
      return res.sendStatus(403);
    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: foundUser.username,
          roles: foundUser.roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "60s" }
    );
    res.json({ accessToken });
  });
};

module.exports = { handleRefreshToken };
