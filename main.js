const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDb = require("./config/db");
const mealsRoutes = require("./routes/meal")
const categoryRoutes = require("./routes/categories")

dotenv.config();



connectDb()


const app = express();
app.use(express.json());

app.use(cors());
app.use(express.json());


app.use("/api/meals", mealsRoutes)
app.use("/api/categories", categoryRoutes)

app.listen(4000, () => {
  console.log("listenning on port 4000")
})