const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDb = require("./config/db");
const mealsRoutes = require("./routes/meal")


dotenv.config();



connectDb()


const app = express();
app.use(express.json());

app.use(cors());
app.use(express.json());
//testing merge

app.use("/api/meals", mealsRoutes)
//commentssss
//ggg
app.listen(5000, () => {
  console.log("listenning on port 4000")
})