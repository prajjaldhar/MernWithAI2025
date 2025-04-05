const Register = require("../models/registerModel");
const bcrypt = require("bcrypt");

const loginController = {
    async login(req,res){
        let user
        try{
            const {email,password} = req.body;
            user = await Register.findOne({email:email});
            console.log(req.body);
            console.log(user);
            if(!user){
                console.log("invalid email");
                return res.json({status:401,error:"invalid email"})
            }
            const isPasswordValid = await bcrypt.compare(password,user.password);
            if(!isPasswordValid){
                return res.json({status:401,error:"invalid password"});
            }
            res.json({status:200,message:"login successful",user:user});
        }catch(error){
            console.log(error);
            res.json({status:500,error:"internal server error"});
        }
    }
}

module.exports = loginController;
