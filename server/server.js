import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
const app = express();
import cookieParser from "cookie-parser";
import cors from "cors";
import logEvents from "./utils/logEvents.js";
import logger from "./middlewares/erroneous-request-logger.js";
import errorHandler from "./middlewares/error-handler.js";
import dotenv from "dotenv";
dotenv.config();
import profileRoutes from "./routes/profileRoutes.js";
import authRoutes from './routes/authRoutes.js'
import wildcardRoute from "./routes/wildcardRoute.js";
const dbURI = process.env.MONGO_URI;
const PORT = process.env.PORT || 3000;

/* import.meta.url provides the URL of the current module file (as a string), 
and must be converted to a file path using fileURLToPath(import.meta.url)

this is necessary because, unlike CommonJS which has __filename and __dirname
available as global variables, the ES6 Modules system does not */
const __filename = fileURLToPath(import.meta.url);

// path.dirname(__filename) extracts the directory path from __filename
const __dirname = path.dirname(__filename);

// enable Cross-Origin Resource Sharing at the specified origin
app.use(
  cors({
    // allow requests from webpack dev server at Port: 8080
    origin: "http://localhost:8080/",
    /* with 'credentials: true' cookies and authorization headers are included in 
    cross-origin requests (pass the Access-Control-Allow-Credentials header) */
    credentials: true,
    /* provides a status code to use for successful OPTIONS requests (OPTIONS request 
    is a preflight request sent by the browser before making a real request (like POST, 
    PUT, or DELETE).) */
    optionsSuccessStatus: 200,
  }),
);

// parses incoming requests with JSON payloads and makes them available in req.body
app.use(express.json());

// parse URL-encoded data submitted by forms (makes accessible through req.body)
app.use(express.urlencoded({ extended: true }));

// parses Cookie header and populates req.cookies with an object keyed by the cookie names
app.use(cookieParser());

// custom middlware that will log any request with a status code >= 400
app.use(logger);

// serve static files (webpack bundle) from 'dist' folder in root directory
app.use(express.static("client/dist"));


app.use(authRoutes)
//
app.use(profileRoutes);

// handle browser refreshes (at endpoints other than root) and unknown roots
app.use(wildcardRoute);

// default error handler
app.use(errorHandler);

const startServer = (async () => {
  try {
    await mongoose.connect(dbURI);
    console.log("✅ connected to MongoDB");
  } catch (error) {
    console.error("❌ ", error);
  }

  mongoose.connection.on("error", (error) => {
    // from node.js docs ▼
    // error.code property is a string representing the error code
    // error.message is a system-provided human-readable description of the error
    // error.info is an object with details about the error condition
    // error.syscall property is a string describing the syscall that failed
    logEvents(
      `${error.code}: ${error.message}\t${error.info}\t${error.syscall}`,
      "mongoErrorLog.log",
    );
  });

  app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`);
  });
})();
