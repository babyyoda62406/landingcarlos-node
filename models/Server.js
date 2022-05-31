const express = require("express")
const multer  = require("multer")
const cors    = require("cors")
const bodyParser = require('body-parser')



class Server{
    constructor(arg){
        this._app  = express()
        this._port = arg
        this.middlewares()
        this.load_get()
        this.load_post()
        this.run(this._port)
    }

    middlewares(){
        this._app.use(express.static("public"))
        this._app.use(cors())
        this._app.use(express.json())
        this._app.use(express.urlencoded({extended: true}))
    }


    load_get(){
        this._app.use("/admin" , require("../routes/admin.js"))
    }

    load_post(){
        this._app.use("/user" , require("../routes/user") )
    }


    run(arg){
        this._app.listen(arg , () => {
            console.log('run in port'  , arg )
        })
    }

}


module.exports = Server