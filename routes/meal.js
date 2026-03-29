const express = require("express")
const { getAllMeals, addMeal, getMealById } = require("../controllers/mealController")

const router = express.Router()

router.get("/", getAllMeals)
router.post("/", addMeal)
router.get("/:id", getMealById)

module.exports = router