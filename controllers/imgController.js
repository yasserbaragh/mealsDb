const category = require("../models/catSchema");
const meal = require("../models/mealSchema");
const fs = require("fs");
const path = require("path");

const addImageToCategory = async (req, res) => {
  try {
    const file = req.file;
    const { name } = req.body;
    console.log(file);
    const picture = "/uploads/" + file.filename;
    const Category = new category({ name, picture });
    await Category.save();
    return res.status(200).json("image added to category");
  } catch (error) {
    console.log(error);
    return res.status(500).json("error");
  }
};

const addImageToMeal = async (req, res) => {
  try {
    const file = req.file;
    const { name, prix, ingredients, category } = req.body;
    console.log(file);
    const picture = "/uploads/" + file.filename;
    const Meal = new meal({ name, prix, ingredients, category, picture });
    await Meal.save();
    return res.status(200).json("image added to meal");
  } catch (error) {
    console.log(error);
    return res.status(500).json("error");
  }
};

const deleteImageFromCategory = async (req, res) => {
  try {
    const categoryy = await category.findById(req.params.id);
    if (!categoryy) return res.status(404).json("not found");

    if (categoryy.picture) {
      fs.unlinkSync("." + categoryy.picture);
    }
    categoryy.picture = null;
    await categoryy.save();
    return res.status(200).json("image deleted from category");
  } catch (error) {
    console.log(error);
    return res.status(500).json("error");
  }
};

const deleteImageFromMeal = async (req, res) => {
  try {
    const meall = await meal.findById(req.params.id);
    if (meall.picture) {
      const filePath = path.join(__dirname, "..", meall.picture);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }
    meall.picture = null;
    await meall.save();
    return res.status(200).json("image deleted from meal");
  } catch (error) {
    console.log(error);
    return res.status(500).json("error");
  }
};

module.exports = {
  addImageToCategory,
  addImageToMeal,
  deleteImageFromCategory,
  deleteImageFromMeal,
};
