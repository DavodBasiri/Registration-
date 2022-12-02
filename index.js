const Aplication = require("./app/server");
const dotenv = require('dotenv');
dotenv.config(".env");
new Aplication(3000,"mongodb://localhost:27017/testDb");