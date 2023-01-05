const mongoose = require("mongoose");
const { Schema } = mongoose;
const Joi = require("joi");

const diseaseSchema = new Schema(
  {
    name: { type: String, required: true },
    causes: [{ type: String }],
    treatment: [{ type: String }]
  },
  { timestamps: true }
);

module.exports.validateDisease = (disease) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    causes:Joi.array().items(Joi.string()),
    treatment:Joi.array().items(Joi.string())
  });
  return schema.validate(disease);
};

module.exports.validateDiseaseUpdate = (disease) => {
  const schema = Joi.object({
    name: Joi.string(),
    causes:Joi.array().items(Joi.string()),
    treatment:Joi.array().items(Joi.string())
  });
  return schema.validate(disease);
};

module.exports.Disease = mongoose.model("Disease", diseaseSchema);
