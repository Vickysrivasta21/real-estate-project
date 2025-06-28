const mongoose = require('mongoose');
const propertyschema = mongoose.Schema({
    id: Number,
    title: String,
    location: String,
    price: String,
    image: String,
    type: String,
    area: String,
    bedrooms: Number,
    bathrooms: Number,
    parking: Boolean
})
module.exports = mongoose.model("Property",propertyschema,"property")