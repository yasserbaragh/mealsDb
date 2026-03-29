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

const deleteById = async(req,res) => {
    
}

module.exports = {getAllMeals, addMeal, getMealById}