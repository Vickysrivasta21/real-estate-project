const express = require("express");
const router = express.Router()
const Property = require('../models/propertydetails')

router.get("/", async (req,res)=>{ //to fetch all property from db
    try{
    const details = await Property.find()
    res.json(details)
    }
    catch(err)
    {
        return res.status(500).json({"message":"something went wrong"})
    }
})

router.post("/", async (req,res)=>{ //to save a property details in db
    const newdetails = req.body
    const property = new Property(newdetails)
    await property.save()
    res.json({"message" : "property details saved!"})
})

module.exports = router;