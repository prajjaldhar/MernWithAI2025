const express = require("express");
const mongoose = require("mongoose");
const router = require("./Routes/index");
const cors = require("cors");
const PORT = 5000;

const app = express();

mongoose
  .connect("mongodb://127.0.0.1:27017/Quiz")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

  app.use(cors());
app.use(express.json());
app.use(express.urlencoded()); // Optional: parse JSON request bodies
app.use(router);
//static file
app.use(express.static(__dirname + "/public"));
app.use("/upload", express.static("upload"));

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
