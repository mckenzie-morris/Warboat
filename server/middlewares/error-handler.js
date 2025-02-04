import logEvents from "../utils/logEvents.js";

const errorHandler = (error, req, res, next) => {
  // call logEvents function passing in the message and logFileName arguments
  logEvents(
    `${error.name}: ${error.message}\t${req.method}\t${req.url}`,
    "errorLog.log",
  );
  /* error.stack returns a string that offers a trace of which functions were 
  called, in what order, from which line and file, and with what arguments */
  console.log(error.stack)
  // set status code as given, if none, set as 500
  const status = res.statusCode ? res.statusCode : 500
  res.status(status)
  const defaultMessage = "Uh-oh SpaghettiOs (something went wrong)!";
  /* send a response (with the correct content-type) that is the parameter 
  converted to a JSON string with either a message (if any) or a default */
  res.json({message: error.message || defaultMessage})
  next();
};

export default errorHandler