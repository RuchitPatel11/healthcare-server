const mongoose = require("mongoose");
const { Schema } = mongoose;
const Joi = require("joi");

const diseaseSchema = new Schema(
  {
    name: { type: String, required: true },
    medicines: [
      { type: Schema.Types.ObjectId, ref: "Medicine", required: true },
    ],
  },
  { timestamps: true }
);

module.exports.validateDisease = (disease) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    medicines: Joi.array().items(Joi.string()).required(),
  });
  return schema.validate(disease);
};

module.exports.validateDiseaseUpdate = (disease) => {
  const schema = Joi.object({
    name: Joi.string(),
    medicines: Joi.array().items(Joi.string()),
  });
  return schema.validate(disease);
};

module.exports.Disease = mongoose.model("Disease", diseaseSchema);
