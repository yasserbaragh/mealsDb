const express = require("express")
const { getAllMeals, addMeal, getMealById ,updatemealById,deletemealById } = require("../controllers/mealController")

const router = express.Router()

router.get("/", getAllMeals)
router.post("/", addMeal)
router.get("/:id", getMealById)
router.put("/:id", updatemealById)     
router.delete("/:id", deletemealById)      

module.exports = router