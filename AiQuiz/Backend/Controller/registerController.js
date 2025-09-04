const bcrypt = require("bcrypt");
const Register = require("../Model/registerModel");

const registerController = {
  async store(req, res) {
    try {
      const { fullname, email, mobile, password } = req.body;

      if (!fullname || !email || !mobile || !password) {
        return res.status(400).json({ error: "All fields are required." });
      }

      const existingUser = await Register.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ error: "Email already exists." });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = await Register.create({
        fullname,
        email,
        mobile,
        password: hashedPassword,
      });

      res.status(201).json({ message: "User registered successfully", user });
    } catch (err) {
      console.error("Signup Error:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = registerController;
