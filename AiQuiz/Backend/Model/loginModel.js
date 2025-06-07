const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const loginModel = new Schema(
  {
    email: { type: String, required: true },
    coordinates: {
      latitude: { type: Number },
      longitude: { type: Number },
    },
  },
  {
    timestamps: true,
  }
);

const Login = mongoose.model("Login", loginModel);
module.exports = Login;
