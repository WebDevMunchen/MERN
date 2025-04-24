const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  try {
    const { access_token: token } = req.cookies;

    if (!token) {
      throw new Error("Forbidden!");
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET);

    req.user = payload;

    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  authenticate,
};
