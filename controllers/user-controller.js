const User = require("../models/user-model");

const registerUser = async (req, res, next) => {
  try {
    const { email, password, role } = req.body;

    const findUser = await User.findOne({ email });

    if (findUser) {
      return res.status(409).json({ message: "User already exists!" });
    }

    const newUser = await User.create({ email, password, role });

    res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Something went wrong!");
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { email, role } = req.body;
    const { id } = req.params;

    const findUser = await User.findById(id);

    if (!findUser) {
      return res.status(404).send("User not found");
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
      return res.status(404).send("User not found");
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
      return res.status(404).send("User not found");
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
};
