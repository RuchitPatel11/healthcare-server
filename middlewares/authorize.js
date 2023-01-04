// const authorize = (roles, req, res, next) => {
//     const { user } = res.locals;
  
//     if (!roles.includes(user.role)) {
//       return next({
//         status: 403,
//         error: { message: "You don't have permission to access this resource." },
//       });
//     }
  
//     if (user.role === "institute-admin") {
//       const { id } = req.params;
  
//       if (user.institute.toString() !== id) {
//         return next({
//           status: 403,
//           error: {
//             message: "You don't have permission to access this resource.",
//           },
//         });
//       }
//     }
  
//     return next();
//   };
  
//   module.exports = authorize;