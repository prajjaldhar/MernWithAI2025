const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const registerModel = new Schema(
  {
    fullname: { type: String },
    mobile: { type: Number },
    email: { type: String },
    password: { type: String },
  },
  {
    timestamps: true,
  }
);

const Register = mongoose.model("user", registerModel);
module.exports = Register;
