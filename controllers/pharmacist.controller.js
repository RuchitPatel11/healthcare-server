// const { Institute } = require("../models/institute.model");

// /**
//  * Creates a new institute
//  */
// const createInstitute = async (req, res, next) => {
//   try {
//     const exists = await Institute.exists(req.body);
//     if (exists)
//       return next({
//         status: 409,
//         error: { message: "An institute with these details already exists." },
//       });

//     const institute = new Institute(req.body);
//     await institute.save();

//     res.locals.institute = institute;
//     return next();
//   } catch (error) {
//     return next({ error });
//   }
// };

// /**
//  * Get institutes filtered by query, selected columns & pagination
//  */
// const getInstitutes = async (req, res, next) => {
//   const { sortBy = "updatedAt", query = {} } = req.query;
//   let {
//     fields = ["name", "createdAt", "updatedAt", "address"],
//     page = 1,
//     perPage = 5,
//     order = -1,
//   } = req.query;

//   // Convert string to number
//   page = parseInt(page, 10) - 1;
//   perPage = parseInt(perPage, 10);
//   order = parseInt(order, 10);

//   try {
//     const totalCount = await Institute.count(query);
//     fields = {
//       ...fields.reduce((prev, curr) => ({ ...prev, [curr]: 1 }), {}),
//       _id: 1,
//       institute: 1,
//     };

//     const institutes = await Institute.aggregate([
//       { $match: query },
//       {
//         $project: fields,
//       },
//       {
//         $sort: { [sortBy]: order },
//       },
//       { $skip: perPage * page },
//       { $limit: perPage },
//     ]);

//     return res.send({
//       totalPages: Math.ceil(totalCount / perPage),
//       totalCount,
//       data: institutes,
//       page: page + 1,
//       perPage,
//       sortBy,
//       fields,
//       order,
//       query,
//     });
//   } catch (error) {
//     return next({ error, message: error.message });
//   }
// };

// /**
//  * Get institute by id
//  */
// const getInstituteById = async (req, res, next) => {
//   const { id } = req.params;

//   try {
//     const institute = await Institute.findById(id);

//     if (!institute) {
//       return next({
//         status: 400,
//         error: { message: "Institute does not exist." },
//       });
//     }

//     return res.send({ institute });
//   } catch (error) {
//     return next({ error });
//   }
// };

// /**
//  * Get institutes list
//  */
// const getInstituteList = async (req, res, next) => {
//   try {
//     const list = await Institute.find({}, "_id name", { sort: "name" });

//     return res.send(list);
//   } catch (error) {
//     return next({ error });
//   }
// };

// /**
//  * Update institute by id
//  */
// const updateInstituteById = async (req, res, next) => {
//   const { id } = req.params;

//   try {
//     await Institute.findByIdAndUpdate(id, { ...req.body });
//     return next();
//   } catch (error) {
//     return next({ error });
//   }
// };

// /**
//  * Deletes institute by id
//  */
// const deleteInstituteById = async (req, res, next) => {
//   const { id } = req.params;

//   try {
//     const result = await Institute.findByIdAndDelete(id);

//     return res.send(result);
//   } catch (error) {
//     return next({ error });
//   }
// };

// module.exports = {
//   createInstitute,
//   getInstitutes,
//   getInstituteById,
//   getInstituteList,
//   updateInstituteById,
//   deleteInstituteById,
// };