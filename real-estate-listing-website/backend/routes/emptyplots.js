const express  = require("express")
const router = express.Router()
const Empty = require("../models/emptyplot")

router.get("/", async (req,res) => {
    try {
        let empty = await Empty.find()
        res.json(empty)
    }
    catch(err)
    {
        return res.status(404).json({"messsage" : "data not found"})
    }
})

router.post("/",async (req,res) => {
    try{
        let empty = req.body
        const emptyplots = new Empty(empty)
        await emptyplots.save()
        res.json({"message" : true})
    }
    catch(err){
        return res.status(404).json({"message" : false})
    }
})

module.exports = router