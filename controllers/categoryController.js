const Category = require("../models/categorySchema")
const Meal = require("../models/mealSchema")


const getAllCategories = async(req, res) => {
    try {
        const categories = await Category.find()
        return res.status(200).json(categories)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "Failed to get categories" })
    }
}
//========================================
//DELETE CATEGORY WITHOUT DELETING MEALS
//========================================
const deleteCategoryById = async(req, res) => {
    try {
        const { id } = req.params
        
        // Check if category exists
        const category = await Category.findById(id)
        if (!category) {
            return res.status(404).json({ message: "Category not found" })
        }
        
        // Check if category has meals
        const mealsInCategory = await Meal.find({ category: id })
        
        if (mealsInCategory.length > 0) {
            await Meal.updateMany(
                { category: id },
                { $set: { category: null } }
            )
            
            console.log(`Updated ${mealsInCategory.length} meal(s) - category set to null`)
        }
        
        // Delete the category
        const deletedCategory = await Category.findByIdAndDelete(id)
        
        return res.status(200).json({
            message: "Category deleted successfully",
        })
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "Failed to delete category" })
    }
}


module.exports = {
    getAllCategories,
    getCategoryById,
    addCategory,
    updateCategoryById,
    deleteCategoryById,
    getMealsByCategory
}