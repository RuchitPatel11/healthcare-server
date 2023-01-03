// const Joi = require("joi");
// const {
//   territories,
//   instituteLevels,
//   instituteTypes,
// } = require("../models/institute.model");

// const createInstitute = (req, res, next) => {
//   const createInstituteSchema = Joi.object({
//     name: Joi.string().min(15).required(),
//     address: Joi.object({
//       line1: Joi.string().required().label("address line 1"),
//       line2: Joi.string().label("address line 2"),
//       town: Joi.string().required().label("town/city"),
//       // UK post code regex
//       postCode: Joi.string()
//         .pattern(/^[A-Z]{1,2}[0-9][A-Z0-9]? ?[0-9][A-Z]{2}$/)
//         .required()
//         .label("post code")
//         .messages({ "string.pattern.base": "Invalid postal code." }),
//       territory: Joi.string()
//         .valid(...territories)
//         .required()
//         .label("territory"),
//       county: Joi.string().label("county"),
//       localAuthority: Joi.string().required().label("local authority"),
//     }).required(),
//     level: Joi.string()
//       .valid(...instituteLevels)
//       .required(),
//     type: Joi.string().valid(...instituteTypes),
//     homePage: Joi.string().uri(),
//     noOfStudents: Joi.number().integer().positive(),
//   });

//   const { error } = createInstituteSchema.validate(req.body, {
//     abortEarly: false,
//   });

//   if (error) {
//     return next({ status: 400, message: error.message, error: error.details });
//   }

//   return next();
// };

// const updateInstitute = (req, res, next) => {
//   const updateSchema = Joi.object({
//     name: Joi.string().min(15),
//     address: Joi.object({
//       line1: Joi.string().label("address line 1"),
//       line2: Joi.string().label("address line 2"),
//       town: Joi.string().label("town/city"),
//       // UK post code regex
//       postCode: Joi.string()
//         .pattern(/^[A-Z]{1,2}[0-9][A-Z0-9]? ?[0-9][A-Z]{2}$/)
//         .label("post code")
//         .messages({ "string.pattern.base": "Invalid postal code." }),
//       territory: Joi.string()
//         .valid(...territories)
//         .label("territory"),
//       county: Joi.string().label("county"),
//       localAuthority: Joi.string().label("local authority"),
//     }),
//     level: Joi.string().valid(...instituteLevels),
//     type: Joi.string().valid(...instituteTypes),
//     homePage: Joi.string().uri(),
//     noOfStudents: Joi.number().integer().positive(),
//   })
//     .min(1)
//     .messages({
//       "object.min": "At least one field is required.",
//     });

//   const { error } = updateSchema.validate(req.body);
//   if (error)
//     return next({
//       status: 400,
//       error: { message: error.message, ...error.details },
//     });

//   return next();
// };

// module.exports = { createInstitute, updateInstitute };