const mongoose = require("mongoose");
const { Schema } = mongoose;
const Joi = require("joi");

const nurseTaskSchema = new Schema(
  {
    patientId: { type: Schema.Types.ObjectId, required: true },
    taskName: { type: String, required: true },
    status: {
      type: String,
      enum: ["Pending", "Completed"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

module.exports.validateNurseTask = (task) => {
  const schema = Joi.object({
    patientId: Joi.string().required(),
    taskName: Joi.string().required(),
    status: Joi.string().valid("Pending", "Completed").default("Pending"),
  });
  return schema.validate(task);
};

module.exports.validateNurseTaskUpdate = (task) => {
  const schema = Joi.object({
    patientId: Joi.string(),
    taskName: Joi.string(),
    status: Joi.string().valid("Pending", "Completed").default("Pending"),
  });
  return schema.validate(task);
};
module.exports.NurseTask = mongoose.model("NurseTask", nurseTaskSchema);
