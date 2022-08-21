const path = require("path");
const fsPromises = require("fs").promises;
const bcrypt = require("bcrypt");
const { exit } = require("process");
const User = require("../model/User");

const registerUser = async (req, res) => {
  const { user, pwd } = req.body;

  if (!user || !pwd) {
    res.status(404).json({ message: "username and password are required" });
  }
  const duplicate = await User.findOne({ username: user });
  if (duplicate) {
    res.status(409).json({ messsage: "User already exists" });
    exit(1);
  }
  const hashedPass = await bcrypt.hash(pwd, 10);

  const newUser = await User.create({
    username: req.body.user,

    password: hashedPass,
  });

  res.sendStatus(200);
};

module.exports = { registerUser };
