const path = require("path");
const fsPromises = require("fs").promises;
const bcrypt = require("bcrypt");
const { exit } = require("process");
const User = require("../model/User");

const registerUser = async (req, res) => {
  const { user,aadhar, pwd } = req.body;

  if (!user || !pwd) {
    res.status(400).json({ message: "username and password are required" });
  }
  if(!aadhar){
   
  }
  const regex = /^\d{12}$/;
  if (!(regex.test(aadhar))) {
   return res.status(400).json({ message: "Invalid Aadhar" });
  } 
  if(pwd.length < 8){
   return res.status(400).json({ message: "password should be of atleast 8 chars" });
  }
  const duplicate = await User.findOne({ aadhar: aadhar });
  if (duplicate) {
    return res.status(400).json({ messsage: "Aadhar number already in use" });
    
  }
  const hashedPass = await bcrypt.hash(pwd, 10);

  const newUser = await User.create({
    username: req.body.user,
    aadhar: req.body.aadhar,
    password: hashedPass,
  });
                          
  res.sendStatus(200);
};

module.exports = { registerUser };
