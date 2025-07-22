const express = require("express")
const router = express.Router()
const Empty = require("../models/emptyplot")



router.get("/:_id", async (req,res) => {
    try{
    const emptydetails = await Empty.findById(req.params._id)
    res.status(200).json(emptydetails)
    }
    catch(err){
        res.status(404).json({"message" : err})
    }
})


module.exports = router