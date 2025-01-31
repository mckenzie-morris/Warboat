import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
const app = express();
import cookieParser from "cookie-parser";
import { logger } from "./middlewares/logger.js";
const PORT = 3000;
import dotenv from "dotenv";
dotenv.config();
const dbURI = process.env.MONGO_URI;

/* import.meta.url provides the URL of the current module file (as a string), 
and must be converted to a file path using fileURLToPath(import.meta.url)

this is necessary because, unlike CommonJS which has __filename and __dirname
available as global variables, the ES6 Modules system does not */
const __filename = fileURLToPath(import.meta.url);

// path.dirname(__filename) extracts the directory path from __filename
const __dirname = path.dirname(__filename);

// custom middlware that will log any request with a status code >= 400
app.use(logger);

// serve static files (webpack bundle) from 'dist' folder in root directory
app.use(express.static("client/dist"));

// parses incoming requests with JSON payloads and makes them available in req.body
app.use(express.json());

// parses Cookie header and populates req.cookies with an object keyed by the cookie names
app.use(cookieParser());

// parse URL-encoded data submitted by forms (makes accessible through req.body)
app.use(express.urlencoded({ extended: true }));

// any route not defined is 404'ed
// app.use("*", (req, res) => {
//     return res.status(404).send("404: Page not found- you silly goose");
//   });

// Global Error Handler
app.use((error, req, res, next) => {
  const defaultMessage = "Uh-oh SpaghettiOs (something went wrong)!";
  const message = error.message || defaultMessage;
  console.log(message);
  return res.status(500).send(message);
});

const startServer = (async () => {
  try {
    await mongoose.connect(dbURI).then(() => {
      console.log("✅ connected to MongoDB");
    });
  } catch (error) {
    console.log("❌ ", error);
  }

  app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`);
  });
})();
