const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const morgan = require("morgan")
const cors = require("cors");
const apiRoute = require("./routes/api.routes")
const app = express();
const PORT = 4000;

dotenv.config();
app.use(morgan("common"))
app.use(cors())

mongoose.connect(process.env.MONGODB_URL, (e) => {
    console.log("Connected to MongoDB 3", e);
})

app.use("/api", apiRoute)

app.get("/", (req, res) => {
    res.send("Hello World");
})

app.listen(PORT, () => {
    console.log(`App is running at PORT ${PORT}`);
})