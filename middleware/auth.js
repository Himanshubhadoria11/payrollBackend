

const jwt = require("jsonwebtoken");
const UserModel = require("../models/user");

const checkUserAuth = async (req, res, next) => {
  try {
    let token;

    // 🔹 1. Check cookies
    if (req.cookies?.token) {
      token = req.cookies.token;
    }

    // 🔹 2. Check Authorization header
    else if (req.headers.authorization?.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res
        .status(401)
        .json({ status: "failed", message: "Unauthorized: No token provided" });
    }

    // 🔹 3. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Make sure your payload matches (id vs ID)
    const userdata = await UserModel.findById(decoded.id || decoded.ID);
    if (!userdata) {
      return res
        .status(401)
        .json({ status: "failed", message: "Unauthorized: User not found" });
    }

    req.userdata = userdata; // attach to request
    next();
  } catch (error) {
    console.error("Auth error:", error.message);
    return res
      .status(401)
      .json({ status: "failed", message: "Unauthorized: Invalid or expired token" });
  }
};

module.exports = checkUserAuth;
