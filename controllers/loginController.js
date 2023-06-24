const bcrypt = require("bcrypt");
const { json } = require("express");
const User = require("../model/User");
const path = require("path");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const fsPromises = require("fs").promises;

const loginUser = async (req, res) => {
  const { user, pwd } = req.body;

  if (!user || !pwd) {
    res.status(400).json({ mesage: "Enter both username and Password" });
    exit(1);
  }
  

  const foundUser = await User.findOne({ username: user });
  if (!foundUser) {
    return res.sendStatus(401);
  }
  const match = await bcrypt.compare(req.body.pwd, foundUser.password);

  if (match) {
    console.log("rightafter match:", foundUser);
    const roles = Object.values(foundUser.roles);
    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: foundUser.username,
          roles: roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1800s" }
    );
    const refreshToken = await jwt.sign(
      { username: foundUser.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    foundUser.refreshToken = refreshToken;
    console.log(refreshToken);

    await User.updateOne(
      { username: req.body.user },
      { refreshToken: refreshToken }
    );
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({ accessToken });
    console.log("access token: ",accessToken)
  } else {
    return res.status(401);
  }
};

module.exports = { loginUser };
