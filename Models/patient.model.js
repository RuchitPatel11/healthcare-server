const mongoose = require("mongoose");
const { Schema } = mongoose;
const bloodGroup = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const patientSchema = new Schema(
  {
    name: { type: String, required: true },
    age: { type: String, required: true },
    height: { type: String },
    weight: { type: String },
    gender: { type: String, enum: ["Male", "Female"], required: true },
    email: { type: String, unique: true, match: /.+\@.+\..+/ },
    phoneNo: { type: String, required: true },
    symptoms: [{ type: String, required: true }],
    temperature: { type: String },
    bloodPressure: { type: String },
    bloodGroup: { type: String, enum: [...bloodGroup], required: true },
    sugarLevel: { type: String },
  },
  { timestamps: true }
);

module.exports.Patient = mongoose.model("Patient", patientSchema);
