const mongoose = require("mongoose");
const { Schema } = mongoose;
const Joi = require("joi");

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      match: /.+\@.+\..+/,
      required: true,
      trim: true,
    },
    password: { type: String, required: true, trim: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    gender: { type: String, enum: ["Male", "Female"], required: true },
    phoneNo: { type: String, required: true },
    role: {
      type: String,
      enum: ["Doctor", "Pharmacist", "Nurse", "Admin"],
      required: true,
    },
  },
  { timestamps: true }
);

//Validation for Registration of User

module.exports.validateRegister = (user) => {
  const schema = Joi.object({
    email: Joi.string().email().required().trim(),
    password: Joi.string().min(8).pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).trim(),
    first_name: Joi.string().required().min(3).max(15),
    last_name: Joi.string().required().min(3).max(15),
    gender: Joi.string().valid("Male", "Female").required(),
    phoneNo: Joi.string().pattern(/^[6-9]{1}\d{9}$/),
    role: Joi.string()
      .valid("Doctor", "Pharmacist", "Nurse", "Admin")
      .required(),
  });
  return schema.validate(user, { abortEarly: false });
};

//Validation for Login of User

module.exports.validateLogin = (user) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(18).required(),
  });
  return schema.validate(user);
};

module.exports.User = mongoose.model("User", userSchema);
