const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "user"], default: "user" },
  //   registeredClasses: {type: Schema.Types.ObjectId, ref: "Classe"}
});

const User = model("User", userSchema);

module.exports = User;
