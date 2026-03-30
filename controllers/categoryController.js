const Category = require("../models/categorySchema")
const Meal = require("../models/mealSchema")


const getCategoryById = async(req, res) => {
    try {
        const { id } = req.params
        const category = await Category.findById(id)

        if (!category) {
            return res.status(404).json({ message: "Category not found" })
        }

        
        const meals = await Meal.find({ category: id }).populate('category')

        return res.status(200).json({
            category: category,
            meals: meals,
            totalMeals: meals.length
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "Failed to get category" })
    }
}

module.exports = {
    getCategoryById
}   