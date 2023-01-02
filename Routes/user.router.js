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

module.exports = router;
