const mongoose = require("mongoose");
const { Schema } = mongoose;
const Joi = require("joi");

const medicineSchema = new Schema({
  name: { type: String, required: true },
  dosage: { type: String, required: true },
});

module.exports.validateMedicine = (medicine) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    dosage: Joi.string().required(),
  });
  return schema.validate(medicine);
};

module.exports.Medicine = mongoose.model("Medicine", medicineSchema);
