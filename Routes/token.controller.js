// const { Token, getNewTokenExpiry } = require('../models/token.model');
// const generateUniqueString = require('../utils/generateUniqueString');
// const sendMail = require('../utils/sendMail');

// /**
//  *  Verify that token is valid
//  */
// const verifyToken = async (req, res, next) => {
//   const { token } = req.query;

//   // Check if token is provided
//   if (!token) return next({ status: 400, error: { message: 'Invalid token' } });

//   try {
//     // Check if token is in db
//     const record = await Token.findOne({ token });
//     if (!record) return next({ status: 401, message: 'Invalid token' });

//     // Check if token is expired
//     if (record.expiresAt.getTime() <= new Date().getTime()) {
//       return next({
//         status: 401,
//         message: 'Token expired.',
//         error: { message: 'Token expired' },
//       });
//     }

//     return next();
//   } catch (error) {
//     return next({ error });
//   }
// };

// /*
//     Regenerate new token
//   */
// const regenerateToken = async (req, res, next) => {
//   const { token } = req.query;

//   // Check if token is provided
//   if (!token) return next({ status: 400, error: { message: 'Invalid token' } });

//   try {
//     // Check wether token exists in db
//     let record = await Token.findOne({ token });
//     if (!record) {
//       return next({ status: 401, error: { message: 'Invalid token' } });
//     }

//     // Generate new token
//     record.token = await generateUniqueString(Token, 'token', 36);
//     record.expiresAt = getNewTokenExpiry();

//     await record.save();
//     record = await record.populate('user', 'email');

//     // Send mail
//     sendMail(record.user.email, record.token);

//     return next();
//   } catch (error) {
//     return next({ error });
//   }
// };

// module.exports = { verifyToken, regenerateToken };