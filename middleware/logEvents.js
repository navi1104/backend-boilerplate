const fs = require("fs");
const fsPromises = require("fs").promises;
const { v4: uuid } = require("uuid");
const { format } = require("date-fns");
const path = require("path");

const logEvents = async ({ url, method, origin, file }) => {
  id = `${uuid()}`;
  date = `${format(new Date(), "yyyyMMdd\tHH:mm:ss")}`;

  await fsPromises.appendFile(
    path.join(__dirname, "..", "logs", file),
    `${origin}  ${url} - ${method}, Date: ${date}, id: ${id}\n`
  );
};

const logger = (req, res, next) => {
  logEvents({
    url: req.url,
    method: req.method,
    origin: req.headers.origin,
    file: "events.txt",
  });
  next();
};

module.exports = { logger, logEvents };
