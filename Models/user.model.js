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
    password: { type: String, trim: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    gender: { type: String, enum: ["Male", "Female"], required: true },
    phoneNo: { type: String, required: true, unique: true },
    role: {
      type: String,
      enum: ["Doctor", "Pharmacist", "Nurse", "Admin"],
      required: true,
    },
    // isVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

//Validation for Registration of User

module.exports.validateRegister = (user) => {
  const schema = Joi.object({
    email: Joi.string().email().required().trim(),
    first_name: Joi.string().required().min(3).max(15),
    last_name: Joi.string().required().min(3).max(15),
    gender: Joi.string().valid("Male", "Female").required(),
    phoneNo: Joi.string()
      .pattern(/^[6-9]{1}\d{9}$/)
      .required(),
    role: Joi.string()
      .valid("Doctor", "Pharmacist", "Nurse", "Admin")
      .required(),
  });
  return schema.validate(user, { abortEarly: false });
};

// Validation for Password
module.exports.validatePassword = (password) => {
  const schema = Joi.object({
    password: Joi.string()
      .min(8)
      .pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]$/
      )
      .trim(),
  });
  return schema.validate(password);
};

//Validation for Login of User

module.exports.validateLogin = (user) => {
  const schema = Joi.object({
    email: Joi.string().email().required().trim(),
    password: Joi.string().required(),
  });
  return schema.validate(user);
};

module.exports.validateUpdateUser = (user) => {
  const schema = Joi.object({
    email: Joi.string().email().trim(),
    first_name: Joi.string().min(3).max(15),
    last_name: Joi.string().min(3).max(15),
    gender: Joi.string().valid("Male", "Female"),
    phoneNo: Joi.string().pattern(/^[6-9]{1}\d{9}$/),
    role: Joi.string().valid("Doctor", "Pharmacist", "Nurse", "Admin"),
  });
  return schema.validate(user);
};

module.exports.User = mongoose.model("User", userSchema);
