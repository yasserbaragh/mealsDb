const express = require("express");
const { getAllCategories, addCategory, getCategoryById, updateCategoryById, deleteCategoryById } = require`("../controllers/categoryController")`

const express = require("express")
const { 
    getAllCategories,
    getCategoryById,
    addCategory,
    updateCategoryById,
    deleteCategoryById,
    getMealsByCategory
} = require("../controllers/categoryController")

const router = express.Router()

router.get("/", getAllCategories)
router.get("/:id", getCategoryById)
router.get("/:categoryId/meals", getMealsByCategory)
router.post("/", addCategory)
router.put("/:id", updateCategoryById)
router.delete("/:id", deleteCategoryById)

module.exports = router