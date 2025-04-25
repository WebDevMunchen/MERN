const jwt = require("jsonwebtoken");
const ErrorResponse = require("../utils/ErrorResponse");

const authenticate = (req, res, next) => {
  try {
    const { access_token: token } = req.cookies;

    if (!token) {
      throw new ErrorResponse("Forbidden!", 403);
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET);

    req.user = payload;

    next();
  } catch (error) {
    console.log(error);
    return res.status(403).json({ message: "Forbidden: Invalid Token" });
  }
};

module.exports = {
  authenticate,
};
