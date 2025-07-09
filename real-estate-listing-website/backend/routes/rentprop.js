const express = require("express")
const router = express.Router()
const rent = require("../models/rentprop")


router.get("/", async(req,res)=>{

    try{
    const data = await rent.find()
    res.json(data)
    }
    catch(err){
        return res.status(404).json({"message" : "data not found"})
    }
})

router.post("/",async (req,res)=>{
 
    try{
    const details = req.body
    const submitdetails = new rent(details) 
    await submitdetails.save()
    return res.status(200).json({"message" : true})
    }
    catch(err){
        return res.status(404).json({"message" : "cannot save details"})
    }
})

module.exports = router;