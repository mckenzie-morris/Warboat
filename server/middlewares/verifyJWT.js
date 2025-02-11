import jwt from "jsonwebtoken";

const verifyJWT = (req, res, next) => {
  /* from the Request interface of the fetch API (allows web browser to make HTTP requests 
    to web servers) */
  // no standard for 'authorization' to start with 'a' or 'A'
  const authHeader = req.headers.authorization || req.headers.authorization;
  /* startsWith() will return true if req.headers.authorization returns a strings that 
    starts with 'Bearer' */
  if (!authHeader?.startWith("Bearer")) {
    // return 401 if req.headers.authorization does not start with 'Bearer'
    return res.status(401).json({ message: "Unauthorized" });
  }
  // split req.headers.authorization into a string and return second word (the token)
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, decoded) => {
    // if the refresh token is invalid (expired, invalid signature, etc.)
    if (error) {
      return res.status(403).json({ message: "forbidden" });
    }
    req.username = decoded.Profile.username;
    next();
  });
};

export default verifyJWT;
