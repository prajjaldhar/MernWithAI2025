const express = require("express");
const mongoose = require("mongoose");
const router = require("./Routes/index");
const morgan = require("morgan");
const cors = require("cors");
const PORT = 5000;

const app = express();
app.use(morgan("dev"));

mongoose
  .connect("mongodb+srv://udawat:1234@udawat.1cdje.mongodb.net/Quiz")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded()); // Optional: parse JSON request bodies
app.use(router);
//static file
app.use(express.static(__dirname + "/public"));
app.use("/upload", express.static("upload"));

app.get("/", (req, res) => res.send("welcome to Express"));

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
