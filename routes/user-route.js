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

const { authenticate, authorize } = require("../middlewares/authenticate");

const userRouter = express.Router();

userRouter.route("/register").post(registerUser);
userRouter.route("/login").post(login);
userRouter.route("/logout").put(logout);
userRouter.route("/getUser/:id").get(getUser);
userRouter.route("/getProfile").get(authenticate, getProfile);
userRouter.route("/updateUser/:id").put(updateUser);
// userRouter.route("/updateUser/:id").put(authenticate, authorize("admin"), updateUser); //Example how to protect the request using roles
userRouter.route("/deleteUser/:id").delete(deleteUser);

module.exports = userRouter;
