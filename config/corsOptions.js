const whitelist = require("./whiteList");
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed By CORS"));
    }
  },
  optionSuccessStatus: 200,
};
module.exports = corsOptions;
