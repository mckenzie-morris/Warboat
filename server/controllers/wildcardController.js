import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* essentially acts as a system to defer both unknown routes and page refreshes
to client-side React router */
const wildcardController = (req, res) => {
  res.sendFile(path.resolve(__dirname, "../../client/dist", "index.html"));
};

export default wildcardController;
