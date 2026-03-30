const mongoose = require("mongoose")

const mealSc = mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    prix: {
        required: true,
        type: Number
    },
    ingredients: [String],
})

    
module.exports = mongoose.model("Meal", mealSc)