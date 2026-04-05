const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDb = require("./config/db");
const authRoutes = require("./routes/authRoutes")
const oauthRoutes = require("./routes/oauthRoutes");
const { logiWithGoogle } = require("./controllers/oauth");
const passport = require("passport");
const cookieParser = require("cookie-parser");

dotenv.config();
connectDb()

const app = express();
app.use(express.json());
app.use(cookieParser())
app.use(cors());
app.use(passport.initialize())
logiWithGoogle()

app.use("/api/auth", authRoutes)
app.use("/auth/google",oauthRoutes)

app.listen(4000, () => {
  console.log("listenning on port 4000")
})