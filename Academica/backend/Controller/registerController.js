const Register = require("../Model/registerModel")

exports.userRegister = async(req,res)=>{
    try{
        const { firstName, lastName, email, password, phone, age, dob,courses, profilePic, address, city, state, country, pincode, bio, topics } = req.body;
        const existUser = await Register.findOne({email})
        if(existUser){
            return res.status(400).json({msg:"User already exists"})
        }
        const imagePath = `/upload/profileImg/${req.file.filename}`;
        const newUser = new Register({
          firstName,
          lastName,
          email,
          password,
          phone,
          age,
          dob,
          profilePic: imagePath,
          address,
          city,
          state,
          country,
          pincode,
          bio,
          courses,
        });
        await newUser.save()
        res.status(201).json({message:"User Registered Successfully",newUser})

    }
    catch(error){
        res.status(500).json({message:"Server Error",error:error.message})
    }
}
exports.userGet = async (req, res) => {
  try {
    const result = await Register.find().populate("courses");
    console.log(result);
    return res.status(200).json({ msg: "user get", data: result });
  } catch (error) {
    res.status(500).json({ msg: "error occurred", error: error.message });
  }
};
  