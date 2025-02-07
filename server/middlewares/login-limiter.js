import { rateLimit } from "express-rate-limit";
import logEvents from "../utils/logEvents.js";

const loginLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minutes
  limit: 5, // Limit each IP to 5 requests per `window` (per windowMs option)
  message:
    "Too many login attempts. Please wait 60 seconds before attempting to login again",
  handler: (req, res, next, options) => {
    logEvents(
      `Too many requests: ${options.message}\t${req.method}\t${req.url}`,
      "errorLog.log",
    );
    res.status(options.statusCode).send(options.message);
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
});

export default loginLimiter;
