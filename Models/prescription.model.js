const mongoose = require("mongoose");
const { Schema } = mongoose;
const Joi = require("joi");

const prescriptionSchema = new Schema(
  {
    patient: { type: Schema.Types.ObjectId, ref: "Patient", required: true },
    diseases: [{ type: Schema.Types.ObjectId, ref: "Disease", required: true }],
    medicines: [
      { type: Schema.Types.ObjectId, ref: "Medicine", required: true },
    ],
    notes: { type: String },
  },
  { timestamps: true }
);

module.exports.validatePrescription = (prescription) => {
  const schema = Joi.object({
    patient: Joi.string().required(),
    diseases: Joi.array().items(Joi.string()).required(),
    medicines: Joi.array().items(Joi.string()).required(),
    notes: Joi.string(),
  });
  return schema.validate(prescription);
};

module.exports.validatePrescriptionUpdate = (prescription) => {
  const schema = Joi.object({
    patient: Joi.string(),
    diseases: Joi.array().items(Joi.string()),
    medicines: Joi.array().items(Joi.string()),
    notes: Joi.string(),
  });
  return schema.validate(prescription);
};

module.exports.Prescription = mongoose.model(
  "Prescription",
  prescriptionSchema
);
