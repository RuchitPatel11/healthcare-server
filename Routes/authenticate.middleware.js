// const jwt = require('jsonwebtoken');
// const { User } = require('../models/user.model');

// /**
//  * Verify if authorization token is valid
//  * if valid then stores user details in res.locals.user
//  */
// const authenticate = async (req, res, next) => {
//   let token = req.get('Authorization');
//   if (!token) {
//     return next({
//       status: 401,
//       error: { message: 'Unauthenticated user access.' },
//     });
//   }

//   token = token.replace('Bearer ', '');

//   const { JWT_SECRET_KEY } = process.env;
//   try {
//     const payload = jwt.verify(token, JWT_SECRET_KEY);

//     if (!payload) {
//       return next({ status: 498, error: { message: 'Invalid token' } });
//     }

//     const user = await User.findOne({ email: payload.sub });
//     if (!user) {
//       return next({ status: 403, error: { message: 'User does not exist.' } });
//     }

//     res.locals.user = user;
//     return next();
//   } catch (error) {
//     if (error.name === 'JsonWebTokenError') {
//       return next({
//         status: 401,
//         error: { message: 'Invalid token' },
//       });
//     }
//     return next({ error });
//   }
// };

// module.exports = authenticate;