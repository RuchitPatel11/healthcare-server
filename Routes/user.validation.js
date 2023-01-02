// const Joi = require("joi");
// const { titles, roles } = require("../models/user.model");

// /**
//  * Validate create user details
//  */
// const createUser = (req, res, next) => {
//   const userSchema = Joi.object({
//     firstName: Joi.string().required().min(2).max(20),
//     lastName: Joi.string().required().min(2).max(20),
//     title: Joi.string()
//       .valid(...titles)
//       .required(),
//     email: Joi.string().email().required(),
//     role: Joi.string()
//       .valid(...roles)
//       .required(),
//     institute: Joi.when("role", {
//       is: Joi.string().valid("institute-admin", "teacher"),
//       then: Joi.number().integer().positive().required(),
//     }),
//   });

//   const { error } = userSchema.validate(req.body, { abortEarly: false });

//   // Handle errors
//   if (error) {
//     return next({ status: 400, message: error.message, error: error.details });
//   }

//   // Go to next if no errors
//   return next();
// };

// /**
//  * Validate login details
//  */
// const login = (req, res, next) => {
//   const loginSchema = Joi.object({
//     email: Joi.string().email().required(),
//     password: Joi.string().required(),
//   });

//   const { error } = loginSchema.validate(req.body);

//   // Handle errors
//   if (error) {
//     return next({ status: 400, error: error.details, message: error.message });
//   }

//   return next();
// };

// /**
//  * Validates email
//  */
// const email = async (req, res, next) => {
//   const emailSchema = Joi.object({
//     email: Joi.string().email().required(),
//   });

//   const { error } = emailSchema.validate(req.body);

//   // Handle error
//   if (error) {
//     return next({ status: 400, error: error.details, message: error.message });
//   }

//   return next();
// };

// /**
//  *  Validate create password details
//  */
// const password = (req, res, next) => {
//   const passwordSchema = Joi.object({
//     password: Joi.string()
//       .min(8)
//       .custom((value, helpers) => {
//         if (!value.match(/[0-9]/)) {
//           return helpers.message("Password must contain at least one number.");
//         }
//         if (!value.match(/[A-Z]/)) {
//           return helpers.message(
//             "Password must contain at least one capital letter."
//           );
//         }
//         if (!value.match(/[!@#$%^&*]/)) {
//           return helpers.message(
//             "Password must contain at least one special character. (!,@,#,$,%,^,&,*)"
//           );
//         }
//         return value;
//       })
//       .required(),
//   });

//   const { error } = passwordSchema.validate(req.body, {
//     abortEarly: false,
//   });

//   // Handle errors
//   if (error) {
//     return next({ status: 400, message: error.message, error: error.details });
//   }

//   // Go to next if no errors
//   return next();
// };

// /**
//  * Validate update user details
//  */
// const updateUser = (req, res, next) => {
//   const updateUserSchema = Joi.object({
//     firstName: Joi.string().min(2).max(20),
//     lastName: Joi.string().min(2).max(20),
//     title: Joi.string().valid(...titles),
//     email: Joi.string().email(),
//     role: Joi.string().valid(...roles),
//     approved: Joi.boolean(),
//   })
//     .min(1)
//     .messages({
//       "object.min": "At least one field is required.",
//     });

//   const { error } = updateUserSchema.validate(req.body);

//   if (error) {
//     return next({ status: 400, message: error.message, error: error.details });
//   }

//   return next();
// };

// module.exports = { createUser, email, password, login, updateUser };