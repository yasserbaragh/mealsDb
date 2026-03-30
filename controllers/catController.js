const Category = require("../models/catSchema")

const getAllCategories = async(req,res) => {
    try {
        const categories = await Category.find()
        return res.status(200).json(categories)
    } catch (error) {
        console.log(error)
        return res.status(405).json("error")
    }   
}

const addCategory = async(req,res) => {
    try{
        const body = req.body
        const category = new Category(body)
        await category.save()
        return res.status(200).json("added to database")    
    } catch (error) {
        console.log(error)
        return res.status(405).json("error")
    }   
}

const getCategoryById = async(req,res) => { 
    try {
        const {id} = req.params
        const category = await Category.findById(id)
        return res.status(200).json(category)
    } catch (error) {   
        console.log(error)
        return res.status(405).json("error")
    } 
}
const DeleteById = async(req,res) => {      
    try{
        const {id} = req.params
        await Category.findByIdAndDelete(id)
        return res.status(200).json("deleted from database")    
    } catch (error) {
        console.log(error)
        return res.status(405).json("error")
    }
}
const addMealToCategory = async(req,res) => {
    try {
        const {id} = req.params
        const {meal} = req.body 
        const category = await Category.findById(id)
        category.meals.push(meal)
        await category.save()
        return res.status(200).json("meal added to category")
    } catch (error) {
        console.log(error)
        return res.status(405).json("error")
    }
}
module.exports = {getAllCategories, addCategory, getCategoryById, DeleteById, addMealToCategory}