const { logEvents } = require("./logEvents");

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send(err.message);
  logEvents({
    url: req.url,
    method: req.method,
    origin: req.headers.origin,
    file: "errLogs.txt",
  });
  next();
};
module.exports = errorHandler;
