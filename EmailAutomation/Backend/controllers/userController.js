const User = require("../models/userModel");


const loginUser = async (req, res) => {
  const {  email, name } = req.body;

  try {
    // Check if the user exists
    let user = await User.findOne({ email });

    if (!user) {
      // If the user does not exist, create a new user
      user = new User({
      
        email,
        name,
        // status: "online", // Change status to "online" on login
      });

      await user.save();
    } else {
      // If the user exists, update the status to "online"
      user.status = "online";
      await user.save();
    }

    res.json({ message: "User logged in successfully", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const logoutUser = async (req, res) => {
  const { googleId } = req.body;

  try {
    // Find the user and set status to "offline"
    let user = await User.findOne({ googleId });

    if (user) {
      user.status = "offline";
      await user.save();
      res.json({ message: "User logged out successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  loginUser,
  logoutUser,
};
