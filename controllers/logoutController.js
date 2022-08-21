const User = require("../model/User");
const fsPromises = require("fs").promises;
const path = require("path");

const handleLogout = async (req, res) => {
  const cookies = req.cookies;
  console.log(cookies.jwt);
  if (!cookies?.jwt) return res.sendStatus(204);
  const refreshToken = cookies.jwt;

  const foundUser = await User.findOne({ refreshToken: refreshToken });
  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
    return res.sendStatus(204);
  }

  await User.update({ refreshToken: refreshToken }, { refreshToken: "" });

  await res.clearCookie("jwt", {
    httpOnly: true,
    sameSite: "None",
    secure: true,
  });
  res.sendStatus(204);
};

module.exports = { handleLogout };
