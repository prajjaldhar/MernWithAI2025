const dotenv = require("dotenv");

dotenv.config();

module.exports = { APP_PORT, DB_URL, BASE_URL } = process.env;
