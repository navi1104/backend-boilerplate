const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyJWT = (req, res, next) => {
  const authHeaders = req.headers.authorization || req.headers.Authorization;
  if (!authHeaders?.startsWith("Bearer ")) {
    return res.status(401);
  }

  const token = authHeaders.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    console.log("decoded:", decoded);
    if (err) return res.sendStatus(403);
    console.log("decoded:", decoded);
    req.user = decoded.UserInfo.username;
    req.roles = decoded.UserInfo.roles;
    next();
  });
};

module.exports = { verifyJWT };
