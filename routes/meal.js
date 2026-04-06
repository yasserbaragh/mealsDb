const express = require("express")
const { getAllMeals, addMeal, getMealById, updatemealById, deletemealById } = require("../controllers/mealController")
const upload = require("../middlewares/multer")
const multer = require("multer")
const router = express.Router()
const Meal = require("../models/mealSchema")



router.get("/", getAllMeals)
router.post("/", addMeal)
router.post("/upload", upload.single("image"), async (req, res) => {
    try {

        const imagePath = req.file.filename;
        const newMeal = await Meal.create({
            name: req.body.name,
            image: imagePath
        });

        res.send({
            message: "Meal created with image",
            data: newMeal
        });

    } catch (err) {
        console.error(err);
        res.status(500).send(err.message);
    }
});

router.get("/:id", getMealById)
router.put("/:id", updatemealById)
router.delete("/:id", deletemealById)

module.exports = router