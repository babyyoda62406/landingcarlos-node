const {Router}  = require("express")
const { sendBack, submit, getMsg, deleteMsg} = require("../controllers/admin")
const routes    = Router()
routes.get("/getMsg" , getMsg)
routes.get("*" , sendBack)

routes.post("/submit" , submit)
routes.post("/deleteMsg", deleteMsg)
module.exports = routes

