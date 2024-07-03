const { JWT_SECRET } = require("../config");
const jwt = require("jsonwebtoken");

// Middleware for handling auth
async function adminMiddleware(req, res, next) {
  // Implement admin auth logic
  // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
  const token = req.headers.authorization; // bearer token
  const words = token.split(" "); // ["Bearer", "token"]
  const jwttoken = words[1]; // token

  try {
    const decodedValue = jwt.verify(jwttoken, JWT_SECRET);
    if (decodedValue.username) {
      next();
    } else {
      res.status(403).json({
        msg: "You are not authenticated",
      });
    }
  } catch (err) {
    res.json({
      msg: "Incorrect inputs",
    });
  }
}

module.exports = adminMiddleware;
