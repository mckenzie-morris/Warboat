import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;

// serve static files from 'dist' folder in root directory
app.use(express.static("client/dist"));

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

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
