const express = require("express")
const router = express.Router()
const Property = require("../models/rentprop")

router.get("/:_id",async (req,res)=>{
    let id = req.params._id
    let rent  = await Property.findById(id)
    if(rent)
    {
        return res.json(rent)
    }
    else{
        return res.status(404).json({"messgae":"rental property not found"})
    }
})


module.exports = router


