const router = require("express").Router();
const {
  User,
  validateRegister,
  validateLogin,
} = require("../Models/user.model");
// const { randomBytes } = require("node:crypto");
const Token = require("../Models/token.model");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

// const generateToken = () => {
//   const token = randomBytes(18).toString("hex");
//   return token;
// };

// router.get("/verifyToken", async (req, res, next) => {
//   const { token } = req.query;
//   if (!token) return res.status(400).send("Invalid token!");

//   // Check Token from Database
//   const findToken = await Token.findOne({ token });
//   if (!findToken) return res.status(400).send("Token Does Not Exist!");

//   // Check Validity of Token
//   if (new Date().getTime() > findToken.validTill.getTime()) {
//     return res.status(401).send("Token Expired!");
//   }
// });

// router.get("regenerateToken", async (req, res, next) => {
//   const { token } = req.query;
//   if (!token) return res.status(400).send("Invalid token!");

//   // Check Token from Database
//   let findToken = await Token.findOne({ token });
//   if (!findToken) return res.status(400).send("Token Does Not Exist!");

//   //REgenerate Token
//   findToken.token = generateToken();
//   await findToken.save();
//   findToken = await record.populate("user", "email");
// });

router.post("/register", async (req, res, next) => {
  const { error, value } = validateRegister(req.body);

  if (error) return res.status(404).send(error);
  let user = await User.findOne({
    email: value.email,
  });
  if (user) return res.status(403).send("User Already Exists!!");

  const newUser = new User(value);

  const salt = await bcrypt.genSalt(10);
  newUser.password = await bcrypt.hash(newUser.password, salt);

  newUser.save(function (err) {
    if (err) return res.status(404).send(err);
    res.status(200).send(newUser);
  });
  // const token = generateToken();
  // const emailVerification = new Token({ token, user: user._id });
  // await emailVerification.save();
});

router.post("/login", async (req, res, next) => {
  const { error, value } = validateLogin(req.body);

  if (error) return res.status(404).send(error);
  let user = await User.findOne({ email: value.email });

  if (!user || !(await bcrypt.compare(value.password, user.password)))
    return res.status(404).send("Invalid Username or Password");

  let accessToken = jwt.sign(
    { email: user.email, role: user.role },
    process.env.secret_key
  );

  res.status(200).send({ email: user.email, token: accessToken });
});


// const { Router } = require("express");
// const userController = require("../controllers/user.controller");
// const userValidations = require("../validations/user.validations");
// const tokenController = require("../controllers/token.controller");
// const authenticate = require("../middleware/authenticate");
// const authorize = require("../middleware/authorize");

// // Path: /user
// const usersRouter = Router();

// // Verify token
// usersRouter.get("/token/check", tokenController.verifyToken, (req, res) => {
//   res.send();
// });

// // Regenerate new token
// usersRouter.get(
//   "/token/regenerate",
//   tokenController.regenerateToken,
//   (req, res) => {
//     res.send();
//   }
// );

// // Create user password if token is valid
// usersRouter.put(
//   "/set-password",
//   tokenController.verifyToken,
//   userValidations.password,
//   userController.createPassword,
//   (req, res) => {
//     res.send();
//   }
// );

// // Login
// usersRouter.post(
//   "/login",
//   userValidations.login,
//   userController.login,
//   userController.generateAccessToken,
//   (req, res) => {
//     const { user, token } = res.locals;
//     res.send({
//       token,
//       user: {
//         firstName: user.firstName,
//         lastName: user.lastName,
//         email: user.email,
//         role: user.role,
//         title: user.title,
//       },
//     });
//   }
// );

// // Reset password
// usersRouter.post(
//   "/reset-password",
//   userValidations.email,
//   userController.generatePasswordResetToken,
//   (req, res) => {
//     res.send();
//   }
// );

// /*  ---------------
//       Admin Routes
//     ---------------  */

// // Middleware
// usersRouter.use(authenticate);
// usersRouter.use((req, res, next) => {
//   authorize(["super-admin"], req, res, next);
// });

// // Create new user
// usersRouter.post(
//   "/",
//   userValidations.createUser,
//   userController.createUser,
//   (req, res) => {
//     res.send();
//   }
// );

// // Update existing user
// usersRouter.put(
//   "/update/:id",
//   userValidations.updateUser,
//   userController.updateUserById,
//   (req, res) => {
//     res.send();
//   }
// );

// // Approve account
// usersRouter.put("/approve", userController.approveUser, (req, res) => {
//   res.send();
// });

// // Get users
// usersRouter.get("/", userController.getUsers);

// // Approve accounts
// module.exports = usersRouter;

module.exports = router;
