// const jwt = require("jsonwebtoken");

// exports.auth = (req, res, next) => {
//   // Get token from header
//   const token = req.header("x-auth-token");

//   // Check if no token
//   if (!token) {
//     return res.status(401).json({ error: "No token, authorization denied" });
//   }

//   // Verify token
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded.user;
//     next();
//   } catch (err) {
//     res.status(401).json({ error: "Token is not valid" });
//   }
// };
// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");

exports.auth = (req, res, next) => {
  const token =
    req.header("x-auth-token") ||
    (req.header("Authorization")?.startsWith("Bearer ")
      ? req.header("Authorization").split(" ")[1]
      : null);

  if (!token) {
    return res.status(401).json({ error: "No token, authorization denied" });
  }

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET).user;
    next();
  } catch {
    res.status(401).json({ error: "Token is not valid" });
  }
};