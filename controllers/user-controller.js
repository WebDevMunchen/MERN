const User = require("../models/user-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res, next) => {
  try {
    const { email, password, role } = req.body;

    const findUser = await User.findOne({ email });

    if (findUser) {
      return res.status(409).send("User already exists!");
    }

    const hash = await bcrypt.hash(password, 10);

    const newUser = await User.create({ email, password: hash, role });

    res.status(201).json({ email: newUser.email, id: newUser._id });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Something went wrong!");
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(404).send("User not found!");
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).send("Incorrect password");
    }

    const payload = { id: user._id, email: user.email };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "480m",
    });

    res
      .cookie("access_token", token, { httpOnly: true, maxAge: 28800000 })
      .json(payload);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Something went wrong!");
  }
};

const logout = async (req, res, next) => {
  res
    .cookie("access_token", "", { httpOnly: true, maxAge: 0 })
    .json({ success: true });
};

const updateUser = async (req, res, next) => {
  try {
    const { email, role } = req.body;
    const { id } = req.params;

    const findUser = await User.findById(id);

    if (!findUser) {
      return res.status(404).send("User not found!");
    }

    const updatedUser = {
      email,
      role,
    };

    const updateUser = await User.findByIdAndUpdate(id, updatedUser, {
      new: true,
    });

    res.status(201).json(updateUser);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Something went wrong!");
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const findUser = await User.findById(id);

    if (!findUser) {
      return res.status(404).send("User not found!");
    }

    const deleteUser = await User.findByIdAndDelete(id);

    res.status(200).send("User deleted!");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Something went wrong!");
  }
};

const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).send("User not found!");
    }

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Something went wrong!");
  }
};

const getProfile = async (req, res, next) => {
  try {
    const { id } = req.user;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).send("User not found!");
    }

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Something went wrong!");
  }
};
module.exports = {
  registerUser,
  updateUser,
  deleteUser,
  getUser,
  getProfile,
  login,
  logout,
};
