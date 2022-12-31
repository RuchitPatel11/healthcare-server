require("dotenv").config();
const PORT = process.env.PORT;
const express = require("express");
const app = express();
app.disable("x-powered-by");
const userRoutes = require("./Routes/user.router");

//Database Connection
const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/Healthcare")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could'd not connect", err));

app.use(express.json());

//ROUTES
app.use("/user", userRoutes);

//Route NOT Found
app.use((req, res, next) => {
  res.status(404).send("Route Not Found");
});

//Error Handler
app.use((error, req, res, next) => {
  // Error gets here
  res.json({
    message: error.message,
  });
});

//Server Running on PORT
app.listen(PORT || 8080, () => {
  console.log(`Server is running on port ${PORT}...`);
});
