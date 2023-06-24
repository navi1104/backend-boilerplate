const User = require("../model/User");
const fsPromises = require("fs").promises;
const path = require("path");

const handleLogout = async (req, res) => {
  console.log('Inside handleLogout function');
  console.log("from logout controller0:", req.cookies);
  console.log(req.headers)
  const cookies = req.cookies;

  if (!cookies?.jwt) {return res.sendStatus(204); 
  console.log("no cookies")}
  const refreshToken = req.cookies.jwt;

  const foundUser = await User.findOne({ refreshToken: refreshToken });
  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
    console.log("from logout controller1:", refreshToken);
    return res.sendStatus(204);
  }

  await User.updateOne({ refreshToken: refreshToken }, { refreshToken: "" });
  console.log("from logout controller2:", refreshToken);
  
  await res.clearCookie("jwt", {
    httpOnly: true,
    sameSite: "None",
    secure: false,
  });
  console.log("from logout controller3:", refreshToken);
  
  res.sendStatus(204);
  console.log("from logout controller4:", refreshToken);
};

module.exports = { handleLogout };
