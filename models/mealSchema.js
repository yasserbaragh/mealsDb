const mongoose = require("mongoose")
const {catSchema} = mongoose

const mealSc = mongoose.Schema({
    name: {
        type: String
    },
    prix: {
        type: Number
    },
    ingredients: [String],
    picture: String,
    category: {type: mongoose.Schema.Types.ObjectId, ref: "mealCategory"},
})


module.exports = mongoose.model("Meal", mealSc)