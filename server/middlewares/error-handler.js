import logEvents from "../utils/logEvents.js";

const errorHandler = (error, req, res, next) => {
  // call logEvents function passing in the message and logFileName arguments
  logEvents(
    `${error.name}: ${error.message}\t${req.method}\t${req.url}`,
    "errorLog.log",
  );
  /* error.stack returns a string that offers a trace of which functions were 
  called, in what order, from which line and file, and with what arguments */
  console.log(error.stack);

  const defaultMessage = "Uh-oh SpaghettiOs (something went wrong)!";
  /* From Express docs: ▼  
  
  when an error is written, the following information is added to the response:
  the res.statusCode is set from err.status (or err.statusCode). If this value 
  is outside the 4xx or 5xx range, it will be set to 500 */
  res
    .status(res.statusCode ? res.statusCode : 500)
    // send a response JSON string with either a message (if any) or a default
    .json({ message: error.message || defaultMessage });
};

export default errorHandler;
