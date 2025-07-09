const mongoose = require("mongoose")

const rentschema = mongoose.Schema({
    id: Number,
    title: String,
    image_url: String,
    rent_monthly: String,
    type: String,
    location: String,
    longitude: Number,
    latitude: Number,
    rating: Number,
    reviews: String,
    features: [String],
    availability: String,
    connectivity: {
        nearest_metro: String,
        nearest_railway: String,
        airport: String
    }
})

module.exports = mongoose.model("rent",rentschema,"rent")