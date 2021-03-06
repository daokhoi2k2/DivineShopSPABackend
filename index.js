const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const apiRoute = require("./routes/api.route");
const authRoute = require("./routes/auth.route");
const app = express();
const PORT = process.env.PORT || 4000;

dotenv.config();
app.use(morgan("common"));
app.use(cors({credentials: true, origin: process.env.ORIGIN_URL}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static("uploads"));



mongoose.connect(process.env.MONGODB_URL, () => {
  console.log("Connected to MongoDB ");
});

app.use("/api", apiRoute);

app.use("/auth", authRoute)

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`App is running at PORT ${PORT}`);
});

