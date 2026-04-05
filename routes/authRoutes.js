const express = require("express")
const { register, login, editUser } = require("../controllers/auth")
const { verifyToken } = require("../middlewares/verifyToken")

const router = express.Router()

router.post("/register", register)
router.post("/login", login)
router.post("/edit", verifyToken, editUser)

module.exports = router