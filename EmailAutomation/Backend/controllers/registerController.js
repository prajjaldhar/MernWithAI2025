const bcrypt = require("bcrypt");
const Register = require("../models/registerModel");

const registerController = {
  async store(req, res) {
    try {
      const { fullname, email, mobile, password } = req.body;

      // Validate required fields
      if (!fullname || !email || !mobile || !password) {
        return res.status(400).json({ error: "All fields are required." });
      }

      // Check if the email already exists
      const emailExist = await Register.findOne({ email });
      if (emailExist) {
        return res.status(409).json({ error: "Email already exists." });
      }

      // Hash password before saving
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create new user
      const user = await Register.create({
        fullname,
        email,
        mobile,
        password: hashedPassword,
      });

      return res
        .status(201)
        .json({ message: "User registered successfully.", user });
    } catch (error) {
      console.error("Error in user registration:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = registerController;
