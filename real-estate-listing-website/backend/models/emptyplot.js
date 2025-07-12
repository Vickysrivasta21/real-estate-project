const mongoose  = require("mongoose")

const EmptySchema = mongoose.Schema({
    id: Number,
    title: String,
    description: String,
    price: Number,
    area: Number,
    specifications: {
      facing: String,
      gatedCommunity: Boolean,
      roadAccess: String
    },
    lat: Number,
    lng: Number,
    location: String,
    type: String,
    image: String,
    rating: Number,
    reviews: [String]
})

module.exports = mongoose.model("Empty",EmptySchema,"emptyplot")