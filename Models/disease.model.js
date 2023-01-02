const mongoose = require("mongoose");
const { Schema } = mongoose;
const Joi = require("joi");

const diseaseSchema = new Schema({
  name: { type: String, required: true },
  medicines: { type: Schema.Types.ObjectId, ref: "Medicine", required: true },
});

module.exports.validateDisease = (disease) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    medicines: Joi.string(),
  });
  return schema.validate(disease);
};
