console.clear()
require("dotenv").config()
const Server = require("./models/Server")
const api    = new Server(process.env.PORT)