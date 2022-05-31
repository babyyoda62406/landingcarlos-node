const { v4: uudiv4 } = require('uuid')
const { readData, saveData } = require("../helpers/db_handler")
const { response } = require("express");
const { request }  = require("express");
const path         = require("path")



const saveMSG = (req= request, res = response)=> {
    const {id , name , phone  , email , message} = req.body
    const load = {
        id:uudiv4(), name, phone , email, message
    }
    try{
        pathDB  = path.join(__dirname, '../db/msg.json' )
        let tempDB  = readData(pathDB)
        tempDB.push(load)
        saveData(tempDB , pathDB )
        res.status(200).json({"msg":"success"})
    }catch(err){
        res.status(503).json({"msg":"wrong"})
    }

}

module.exports =  {
    saveMSG
}