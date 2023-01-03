// /**
//  * Verify user credentials
//  */
// const login = async (req, res, next) => {
//     const { email, password } = req.body;
  
//     try {
//       const user = await User.findOne({ email });
  
//       // Check if user exists
//       if (!user) {
//         return next({
//           status: 401,
//           error: { message: "Invalid username or password" },
//         });
//       }
  
//       // Check wether account is verified & approved
//       if (!user.verified) {
//         return next({
//           status: 403,
//           error: { message: "Account is not verified" },
//         });
//       }
//       if (!user.approved) {
//         return next({
//           status: 403,
//           error: { message: "Account is not approved." },
//         });
//       }
  
//       // Check wether password is valid
//       const isPasswordValid = bcrypt.compareSync(password, user.password);
  
//       if (!isPasswordValid) {
//         return next({
//           status: 401,
//           error: { message: "Invalid username or password" },
//         });
//       }
  
//       res.locals.user = user;
//       return next();
//     } catch (error) {
//       return next({ error });
//     }
//   };
  
//   /**
//    * Generates access token and stores it in res.locals
//    */
//   const generateAccessToken = async (req, res, next) => {
//     const { user } = res.locals;
//     const { JWT_SECRET_KEY } = process.env;
//     const tokenValidity = "3d"; // 3days
  
//     try {
//       // Create jti claim
//       const jti = new JTI({ user: user._id });
//       await jti.save();
  
//       const token = jwt.sign(
//         { sub: user.email, role: user.role },
//         JWT_SECRET_KEY,
//         {
//           expiresIn: tokenValidity,
//           jwtid: jti._id.toString(),
//         }
//       );
  
//       res.locals.token = token;
//       return next();
//     } catch (error) {
//       return next({ error });
//     }
//   };