const mongoose = require("mongoose");
const { Schema } = mongoose;
const Joi = require("joi");
const bloodGroup = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const patientSchema = new Schema(
  {
    name: { type: String, required: true },
    age: { type: String, required: true },
    height: { type: String },
    weight: { type: String },
    gender: { type: String, enum: ["Male", "Female"], required: true },
    email: { type: String, unique: true, match: /.+\@.+\..+/ },
    phoneNo: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    symptoms: [{ type: String, required: true }],
    temperature: { type: String },
    bloodPressure: { type: String, required: true },
    bloodGroup: { type: String, enum: [...bloodGroup], required: true },
    sugarLevel: { type: String },
  },
  { timestamps: true }
);

module.exports.validatePatient = (patient) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    age: Joi.string().required(),
    height: Joi.string(),
    weight: Joi.string(),
    gender: Joi.string().valid("Male", "Female").required(),
    email: Joi.string().email(),
    phoneNo: Joi.string()
      .required()
      .pattern(/^[6-9]{1}\d{9}$/),
    address: Joi.string().required(),
    symptoms: Joi.array().items(Joi.string()),
    temperature: Joi.string(),
    bloodPressure: Joi.string().required(),
    bloodGroup: Joi.string()
      .valid(...bloodGroup)
      .required(),
    sugarLevel: Joi.string(),
  });
  return schema.validate(patient);
};

module.exports.Patient = mongoose.model("Patient", patientSchema);
