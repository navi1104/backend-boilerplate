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

router.get('/user-signup(.html)?', (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", 'user-signup.html'));
});

router.get('/user-login(.html)?', (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", 'user-login.html'));
});

router.get('/user-home(.html)?', (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", 'user-home.html'));
});

router.get('/admin-login(.html)?', (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", 'admin-login.html'));
});


router.get('/admin-home(.html)?', (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", 'admin-home.html'));
});



module.exports = router;
