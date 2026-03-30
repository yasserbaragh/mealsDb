const Meal = require("../models/mealSchema")
const getAllMeals = async(req,res) => {
    try {
        const meals = await Meal.find()
        return res.status(200).json(meals)
    } catch (error) {
        console.log(error)
        return res.status(405).json("error")
    }
}


const addMeal = async(req,res) => {
    try {
        const body = req.body
        const meal = new Meal(body)
        await meal.save()
        return res.status(200).json("added to database")
    } catch (error) {
        console.log(error)
        return res.status(405).json("error")
    }
}

const getMealById = async(req,res) => {
    try {
        const {id} = req.params
        const meal = await Meal.findById(id)
        return res.status(200).json(meal)
    } catch (error) {
        console.log(error)
        return res.status(405).json("error")
    }
}

const deletemealById = async(req,res) => {
    try {
        const {id} = req.params
        
        const deletedMeal = await Meal.findByIdAndDelete(id)
        
        if (!deletedMeal) {
            return res.status(404).json({ message: "Meal not found" })
        }
        
        return res.status(200).json({
            message: "Meal deleted successfully",
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "Failed to delete meal" })
    }
}
 
const updatemealById = async(req,res) =>{
    try {
        const {id} = req.params
        const body = req.body
        const updatedMeal = await Meal.findByIdAndUpdate(id, body, { new: true })
        if (!updatedMeal) {
            return res.status(404).json({ message: "Meal not found" })
        }
        return res.status(200).json(updatedMeal)  
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "Failed to update meal" })
    }
}

module.exports = {getAllMeals, addMeal, getMealById, deletemealById, updatemealById}