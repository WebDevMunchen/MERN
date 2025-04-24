const express = require("express");
const {
  registerUser,
  updateUser,
  deleteUser,
  getUser,
} = require("../controllers/user-controller");

const userRouter = express.Router();

userRouter.route("/register").post(registerUser);
userRouter.route("/getUser/:id").get(getUser);
userRouter.route("/updateUser/:id").put(updateUser);
userRouter.route("/deleteUser/:id").delete(deleteUser);

module.exports = userRouter;
