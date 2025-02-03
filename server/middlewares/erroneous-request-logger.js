import logEvents from "../utils/logEvents";

const logger = (req, res, next) => {
  // 🚩 log all requests 🚩
  // logEvents(`${req.method}\t${req.url}`, "reqLog.log");
  // console.log(`${req.method} ${req.path}`);
  // next();

  // runs when the response is sent
  res.on("finish", () => {
    // only log failed requests
    if (res.statusCode >= 400) {
      // from Express.js docs ▼
      // req.method: a string corresponding to the HTTP method of the request: GET, POST, PUT, and so on
      // req.originalUrl: like req.url; however, it retains the original request URL
      logEvents(`${req.method}\t${req.originalUrl}`, "requestLog.log");
    }
  });
  console.log(`${req.method} ${req.path}`);
  next();
};

export default logger;
