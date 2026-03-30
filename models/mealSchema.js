const mongoose = require("mongoose")
const {catSchema} = mongoose

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

    
    category: {type: mongoose.Schema.Types.ObjectId, ref: "mealCategory"},
})


module.exports = mongoose.model("Meal", mealSc)