const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const loginModel = new Schema(
    {
    email:{type:String},
    password:{type:String},
    }
)
const Login = mongoose.model("Login",loginModel);
module.exports = Login;
