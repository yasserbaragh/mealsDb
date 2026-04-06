const mongoose = require("mongoose");

const mealcategory = mongoose.Schema({
    name: {
        type: String
    },
    meals: [String],
    picture: String
})

module.exports = mongoose.model("mealCategory", mealcategory)