const router = express.Router()
const {addImageToCategory, addImageToMeal, deleteImageFromCategory, deleteImageFromMeal} = require("../controllers/imgController")
const upload = require("../middleware/multer")

router.post("/category", upload.single("picture"), addImageToCategory)
router.post("/meal", upload.single("picture"), addImageToMeal)
router.delete("/category/:id", deleteImageFromCategory)
router.delete("/meal/:id", deleteImageFromMeal)

module.exports = router
