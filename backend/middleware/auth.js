const jwt = require("jsonwebtoken");
function auth(req, res, next) {
  const authHeader = req.header("Authorization");
  const token = authHeader.split(" ")[1];
  if (!token)
    return res.status(401).json({ message: "No token, acces denied" });
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    console.log("Received token:", token);
    console.log("Secret:", process.env.JWT_SECRET);
    res.status(400).json({ message: "Invalid token" });
  }
}
module.exports = auth;
