require("dotenv").config();
const path = require("path");
const express = require("express");
const app = express();
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const { verifyJWT } = require("./middleware/verifyJWT");
const credentials = require("./middleware/credentials");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const connectDB = require("./config/dbConn");

const PORT = process.env.PORT || 3500;
connectDB();
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
app.use(cookieParser());
app.use(credentials);
app.use(cors(corsOptions));
app.use(logger);

//Deliviering your files to different web pages (for static server pages not API)
app.use(express.static(path.join(__dirname, "./public")));
app.use("/subdir", express.static(path.join(__dirname, "./public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Using the routers

app.use("/", require("./routes/root"));
app.use("/register", require("./routes/userReg"));
app.use("/refresh", require("./routes/refresh"));
app.use("/login", require("./routes/login"));
app.use("/logout", require("./routes/logout"));

app.use(verifyJWT);
app.use("/employees", require("./routes/employees"));

//Handling Errors
app.get("/*", (req, res) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
  console.log(res.statusCode);
});
app.use(errorHandler);
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
