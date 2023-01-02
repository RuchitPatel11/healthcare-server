// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const { User } = require("../models/user.model");
// const { Token } = require("../models/token.model");
// const sendMail = require("../utils/sendMail");
// const generateUniqueString = require("../utils/generateUniqueString");
// const nextId = require("../utils/getNextId");

// /**
//  * Generates password reset token
//  */
// const generatePasswordResetToken = async (req, res, next) => {
//   const { email } = req.body;

//   try {
//     const user = await User.findOne({ email });

//     // Check if user exists with given email
//     if (!user) {
//       return next({ status: 401, error: { message: "User does not exist." } });
//     }

//     const token = await generateUniqueString(Token, "token", 36);

//     await Token.findOneAndUpdate(
//       { user: user._id },
//       { token },
//       { upsert: true }
//     );

//     sendMail(email, token);

//     return next();
//   } catch (error) {
//     return next({ error });
//   }
// };

// /**
//  * Creates a new user and sends verification token in email
//  */
// const createUser = async (req, res, next) => {
//   try {
//     const existing = await User.findOne({ email: req.body.email });
//     if (existing) {
//       return next({
//         status: 403,
//         error: [
//           {
//             message: "An account with this email already exists.",
//             type: "any.invalid",
//             context: {
//               key: "email",
//             },
//           },
//         ],
//         message: "An account with this email already exists.",
//       });
//     }

//     const user = new User({
//       ...req.body,
//       approved: true,
//       _id: await nextId(User),
//     });
//     await user.save();

//     // Generate and save token
//     const token = await generateUniqueString(Token, "token", 36);
//     const verification = new Token({
//       token,
//       user: user._id,
//       _id: await nextId(Token),
//     });
//     await verification.save();

//     // Send email
//     sendMail(user.email, token);

//     return next();
//   } catch (error) {
//     return next({ error });
//   }
// };

// /**
//  * Encrypts and inserts password into db
//  */
// const createPassword = async (req, res, next) => {
//   const { token } = req.query;

//   try {
//     const { user: userId } = await Token.findOne({ token }, { user: 1 });
//     const { password } = req.body;

//     // Generate hash and update user document
//     const hash = await bcrypt.hash(password, 10);
//     await User.findByIdAndUpdate(userId, { password: hash, verified: true });

//     // Delete token
//     await Token.findOneAndDelete({ token });

//     return next();
//   } catch (error) {
//     return next({ error });
//   }
// };

// /**
//  * Verify user credentials
//  */
// const login = async (req, res, next) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });

//     // Check if user exists
//     if (!user) {
//       return next({
//         status: 401,
//         error: { message: "Invalid username or password" },
//       });
//     }
//     // Check wether account is verified & approved
//     if (!user.verified) {
//       return next({
//         status: 403,
//         error: { message: "Account is not verified" },
//       });
//     }
//     if (!user.approved) {
//       return next({
//         status: 403,
//         error: { message: "Account is not approved." },
//       });
//     }

//     // Check wether password is valid
//     const isPasswordValid = bcrypt.compareSync(password, user.password);

//     if (!isPasswordValid) {
//       return next({
//         status: 401,
//         error: { message: "Invalid username or password" },
//       });
//     }

//     res.locals.user = user;
//     return next();
//   } catch (error) {
//     return next({ error });
//   }
// };

// /**
//  * Generates access token and stores it in res.locals
//  */
// const generateAccessToken = (req, res, next) => {
//   const { user } = res.locals;
//   const { JWT_SECRET_KEY } = process.env;
//   const tokenValidity = 3 * 24 * 60 * 60 * 1000; // 3days

//   const token = jwt.sign({ sub: user.email, role: user.role }, JWT_SECRET_KEY, {
//     expiresIn: tokenValidity,
//   });

//   res.locals.token = token;
//   return next();
// };

// /**
//  * Approves user account
//  */
// const approveUser = async (req, res, next) => {
//   const { email } = req.body;

//   // Check if email is provided
//   if (!email) {
//     return next({ status: 400, error: { message: "Email is required" } });
//   }

//   try {
//     const user = await User.findOne({ email });

//     // Check if user exists
//     if (!user) {
//       return next({ status: 400, error: { message: "User does not exist." } });
//     }

//     // Check if email is verified
//     if (!user.verified) {
//       return next({
//         status: 400,
//         error: { message: "User's email is not verified." },
//       });
//     }

//     user.approved = true;
//     await user.save();

//     return next();
//   } catch (error) {
//     return next({ error });
//   }
// };

// /**
//  * Updates user by id
//  */
// const updateUserById = async (req, res, next) => {
//   const { id } = req.params;

//   try {
//     const user = await User.findOne({ id });

//     // Check if user exists
//     if (!user) {
//       return next({ status: 404, error: { message: "User does not exist." } });
//     }

//     Object.keys(req.body).forEach((field) => {
//       user[field] = req.body[field];
//     });

//     await user.save();

//     return next();
//   } catch (error) {
//     return next({ error });
//   }
// };

// /**
//  * Get users filtered by query, selected columns & pagination
//  */
// const getUsers = async (req, res, next) => {
//   const {
//     page = 0,
//     perPage = 5,
//     sortBy = "updatedAt",
//     order = 1,
//     query = {},
//     fields = [],
//   } = req.query;

//   try {
//     const count = await User.count(query);
//     const users = await User.find(query, fields, {
//       skip: page * perPage,
//       limit: perPage,
//     })
//       .populate({
//         path: "institute",
//         select: "name id -_id",
//       })
//       .sort({
//         [sortBy]: order,
//       });

//     return res.send({
//       totalPages: Math.ceil(count / perPage),
//       totalCount: count,
//       data: users,
//       page,
//       perPage,
//       sortBy,
//       fields,
//       order,
//       query,
//     });
//   } catch (error) {
//     return next({ error });
//   }
// };

// module.exports = {
//   generateAccessToken,
//   createUser,
//   createPassword,
//   login,
//   approveUser,
//   generatePasswordResetToken,
//   getUsers,
//   updateUserById,
// };