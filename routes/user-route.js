const express = require("express");
const {
  registerUser,
  updateUser,
  deleteUser,
  login,
  getProfile,
  getUser,
  logout,
} = require("../controllers/user-controller");

const { authenticate } = require("../middlewares/authenticate");

const userRouter = express.Router();

userRouter.route("/register").post(registerUser);
userRouter.route("/login").post(login);
userRouter.route("/logout").put(logout);
userRouter.route("/getUser/:id").get(getUser);
userRouter.route("/getProfile/:id").get(authenticate, getProfile);
userRouter.route("/updateUser/:id").put(updateUser);
userRouter.route("/deleteUser/:id").delete(deleteUser);

module.exports = userRouter;
