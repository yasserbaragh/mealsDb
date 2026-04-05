const User = require("../models/User")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const validator = require("validator")

const register = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!validator.isEmail(email)) {
            return res.status(400).json("wrong email format")
        }

        if (!validator.isStrongPassword(password)) {
            return res.status(400).json("password weak")
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = new User({ email, password: hashedPassword })
        await user.save()
        return res.status(200).json("user registered")
    } catch (error) {
        console.log(error)
        return res.status(400).json("error has occured")
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        const verifyPassword = await bcrypt.compare(password, user.password)
        if (!verifyPassword) {
            return res.status(401).json({ message: "Invalid credentials" })
        }

        const token = jwt.sign(
            { id: user._id, email: user.email }, process.env.SECRET, { expiresIn: "1d" }
        )

        return res.status(200).json({ message: "user loggedIn", token })
    } catch (error) {
        console.log(error)
        return res.status(400).json("error has occured")
    }
}

const editUser = async (req, res) => {
    try {
        const { email, password } = req.body
        console.log(req.user)

        const user = await User.findById( req.user.id )
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        if (email) {
            user.email = email
        }

        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10)
            user.password = hashedPassword
        }
        await user.save()

        return res.status(200).json({ message: "User updated successfully" })
    } catch (error) {
        console.log(error)
        return res.status(400).json("error has occured")
    }
}

module.exports = { register, login, editUser }