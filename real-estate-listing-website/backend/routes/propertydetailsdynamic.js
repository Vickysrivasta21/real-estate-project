const express = require("express")
const router = express.Router()
const Property = require("../models/propertydetails")


router.get("/:_id",async (req,res)=>{
    const id = req.params._id
    const user = await Property.findById(id)
    if(!user)
    {
        return res.status(404).json({message:"property not found"})
    }
    res.json(user)
})


module.exports = router;