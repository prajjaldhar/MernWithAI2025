const Register = require("../Model/registerModel");
const Login = require("../Model/loginModel");
const bcrypt = require("bcrypt");

const loginController = {
  async login(req, res) {
    try {
      const { email, password, coordinates } = req.body;

      const user = await Register.findOne({ email });
      if (!user) {
        return res.json({ status: 401, error: "Invalid email" });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.json({ status: 401, error: "Invalid password" });
      }

      // ✅ Update coordinates in Register
      if (coordinates?.latitude && coordinates?.longitude) {
        user.coordinates = coordinates;
        await user.save();
      }

      // ✅ Insert or update Login model
      const existingLogin = await Login.findOne({ email });
      if (existingLogin) {
        // Update with new coordinates & updatedAt
        existingLogin.coordinates = coordinates;
        await existingLogin.save();
      } else {
        // Insert new login record
        await Login.create({
          email,
          coordinates,
        });
      }

      return res.json({
        status: 200,
        message: "Login successful",
        user,
      });
    } catch (error) {
      console.error("Login error:", error);
      res.json({ status: 500, error: "Internal server error" });
    }
  },
};

module.exports = loginController;
