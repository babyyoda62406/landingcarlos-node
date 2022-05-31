
const {Router}  = require("express")
const { saveMSG } = require("../controllers/user")
const routes    = Router()
routes.post("/msg" , saveMSG)

module.exports = routes