const path = require("path");
const express = require("express");
const router = express.Router();

router.get("^/$|/index(.html)|/home(.html)??", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "index.html"));
  console.log(res.statusCode);
});

router.get("/navi(.html)?", (req, res) => {
  res.redirect(301, "/index.html");
  console.log(res.statusCode);
});

module.exports = router;
