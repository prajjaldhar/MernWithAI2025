const Register = require("../Model/registerModel");
const mongoose = require("mongoose");

exports.userRegister = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      phone,
      age,
      dob,
      courses,
      address,
      city,
      state,
      country,
      pincode,
      bio,
      topics,
    } = req.body;

    const existUser = await Register.findOne({ email });
    if (existUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    let imagePath = "";
    if (req.file && req.file.filename) {
      imagePath = `/upload/profileImg/${req.file.filename}`;
    } else {
      return res.status(400).json({ message: "Profile picture is required" });
    }

    let parsedCourses = [];
    if (courses) {
      try {
        const temp = JSON.parse(courses); // Expecting an array of string ids
        parsedCourses = temp.map((id) => {
          if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error(`Invalid ObjectId: ${id}`);
          }
          return new mongoose.Types.ObjectId(id);
        });
      } catch (e) {
        console.log(e.message);
        return res
          .status(400)
          .json({ message: "Invalid courses format or ID", error: e.message });
      }
    }

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
      courses: parsedCourses,
    });

    await newUser.save();
    res.status(201).json({ message: "User Registered Successfully", newUser });
  } catch (error) {
    console.error("Signup error:", error); // Add this
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

exports.userGet = async (req, res) => {
  try {
    const result = await Register.find().populate("courses");
    console.log(result);
    return res.status(200).json({ msg: "user get", data: result });
  } catch (error) {
    res.status(500).json({ msg: "error occurred", error: error.message });
  }
};
