require("dotenv").config();
const PORT = process.env.PORT;
const express = require("express");
const app = express();
app.disable("x-powered-by");
const userRoutes = require("./Routes/user.router");
const patientRoutes = require("./Routes/patient.router");

//Database Connection
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/Healthcare")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could'd not connect", err));

app.use(express.json());

//ROUTES
app.use("/user", userRoutes);
app.use("/patient", patientRoutes);

//Route NOT Found
app.use((req, res, next) => {
  res.status(404).send("Route Not Found");
});

//Error Handler
app.use((error, req, res, next) => {
  console.log(error);
  // Error gets here
  res.status(500).json({
    message: error.message,
    error,
  });
});

//Server Running on PORT
app.listen(PORT || 8080, () => {
  console.log(`Server is running on port ${PORT}...`);
});
