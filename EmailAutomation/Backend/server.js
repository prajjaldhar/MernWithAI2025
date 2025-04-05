require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

const { APP_PORT } = require("./config/index");
const connectDB = require("./Db/dbconfig"); // 🔗 Import DB connection
const routes = require("./routes/index");

// Connect to MongoDB
connectDB();

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

// Routes
app.use(routes);

// Static Files
app.use(express.static(__dirname + "/public"));
app.use("/upload", express.static("upload"));

// Start server
app.listen(APP_PORT, () => {
  console.log(`🚀 Server running on port ${APP_PORT}`);
});
