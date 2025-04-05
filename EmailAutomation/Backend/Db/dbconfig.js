const mongoose = require("mongoose");
const { DB_URL } = require("../config/index");

const connectDB = async () => {
  try {
    await mongoose.connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Database Connected Successfully");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);
    process.exit(1); // exit app on failure
  }
};

module.exports = connectDB;
