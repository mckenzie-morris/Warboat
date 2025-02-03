import { format } from "date-fns";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import fsPromises from "fs/promises";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const logEvents = async (message, logFileName) => {
    // create a timestamp using date-fns package
    const dateTime = `${format(new Date(), "MM/dd/yyyy\tHH:mm:ss")}`;
    // format a string that includes the date, a unique ID, and request details
    const logItem = `${dateTime}\t${uuidv4()}\t${message}\n`;
  
    try {
      /* existsSync(...) checks if logs directory does or does not exist
      if it does not exist, create it */
      if (!fs.existsSync(path.resolve(__dirname, "../logs"))) {
        // if 'logs' directory does not exist, fsPromises.mkdir(...) creates it
        await fsPromises.mkdir(path.resolve(__dirname, "../logs"));
      }
      /* if the logs file does not yet exist, create it
      if the logs does exist, append it */
      await fsPromises.appendFile(
        path.resolve(__dirname, "../logs", logFileName),
        logItem,
      );
    } catch (error) {
      console.log(error);
    }
  };

  export default logEvents