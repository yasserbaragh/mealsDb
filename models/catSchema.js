const mongoose = require("mongoose");

const mealcategory = mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    meals: [String],
})

module.exports = mongoose.model("mealCategory", mealcategory)