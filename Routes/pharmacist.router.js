// const { Router } = require("express");
// const authenticate = require("../middleware/authenticate");
// const authorize = require("../middleware/authorize");
// const instituteController = require("../controllers/institute.controller");
// const instituteValidations = require("../validations/institute.validation");

// // Path: /institutes
// const institutesRouter = Router();

// // Get a list of institutes
// institutesRouter.get("/list", instituteController.getInstituteList);

// // Get institute by id
// institutesRouter.get("/:id", instituteController.getInstituteById);

// // Authentication
// institutesRouter.use(authenticate);

// /*  ---------------
//    Inst. Admin Routes
//     ---------------  */

// // Update institute by id
// institutesRouter.put(
//   "/:id",
//   (req, res, next) => {
//     authorize(["super-admin", "institute-admin"], req, res, next);
//   },
//   instituteValidations.updateInstitute,
//   instituteController.updateInstituteById,
//   (req, res) => res.send()
// );

// /*  ---------------
//       Admin Routes
//     ---------------  */

// // Authorization
// institutesRouter.use((req, res, next) => {
//   authorize(["super-admin"], req, res, next);
// });

// // Creates institute
// institutesRouter.post(
//   "/",
//   instituteValidations.createInstitute,
//   instituteController.createInstitute,
//   (req, res) => {
//     res.send(res.locals.institute);
//   }
// );

// // Get Institutes
// institutesRouter.get("/", instituteController.getInstitutes);

// // Delete Institute by id
// institutesRouter.delete(
//   "/:id",
//   instituteController.deleteInstituteById,
//   (req, res) => res.send()
// );

// module.exports = institutesRouter;