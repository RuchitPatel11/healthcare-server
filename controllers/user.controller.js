const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  User,
  validateRegister,
  validatePassword,
  validateLogin,
} = require("../Models/user.model");
const { Token } = require("../Models/token.model");
const { randomBytes } = require("node:crypto");
const generateToken = () => {
  const token = randomBytes(18).toString("hex");
  return token;
};

// Add new User
const addUser = async (req, res, next) => {
  const { error, value } = validateRegister(req.body);
  if (error) return res.status(404).send(error);
  try {
    let user = await User.findOne({
      email: value.email,
    });
    if (user) return res.status(403).send("User Already Exists!!");

    const newUser = new User(value);
    await newUser.save(function (err) {
      if (err) return res.status(404).send(err);
      res.status(200).send(newUser);
    });
    // Generate and save token
    const token = await generateToken();
    const verify = new Token({
      token,
      user: newUser._id,
    });
    await verify.save();
    return next();
  } catch (error) {
    return next({ error });
  }
};

const updateUserById = async (req, res, next) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }
  const id = req.params.id;
  User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send("Cannot Update User");
      } else res.send({ message: "Tutorial was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

// Create Password
const createPassword = async (req, res, next) => {
  const { token } = req.query;
  const { error, value } = validatePassword(req.body);
  if (error) return res.status(404).send(error);
  try {
    const { user } = await Token.findOne({ token }, { user: 1 });

    // Encrypt Password
    const hash = await bcrypt.hash(value.password, 10);
    await User.findByIdAndUpdate(user, { password: hash });

    // Delete token
    await Token.findOneAndDelete({ token });
    return next();
  } catch (error) {
    return next({ error });
  }
};

// Generate Password Reset Token
// const passwordResetToken = async (req, res, next) => {
//   const { email } = req.body;

//   const user = await User.findOne({ email });

//   // Check whether user exists or not
//   if (!user) return res.status(401).send("User Does Not Exist!");

//   const token = await generateToken();

//   await Token.findOneAndUpdate(
//     { user: user.email },
//     { token },
//     { upsert: true }
//   );
// };

//Verify User
const login = async (req, res, next) => {
  const { email, password } = validateLogin(req.body);
  if (!req.body) return res.status(401).send("Please Enter Email and Password");
  const user = await User.findOne({ email });
  if (!user) return res.status(401).send("Invalid Username or Password");

  // Check account is verified or not
  //   if (!user.isVerified) return res.status(403).send("Account Not Verified");

  // Check password is valid or not
  const passwordValid = bcrypt.compare(password, user.password);

  if (!passwordValid)
    return res.status(401).send("Invalid Username or password");

  res.locals.user = user;
  next();
};

const accessTokenValidity = () => {
  let dt = new Date();
  dt.setHours(dt.getHours() + 72);
  let ut = dt.toLocaleString();
  return ut;
};

//Generate Access Token
const accessToken = (req, res, next) => {
  const { user } = res.locals;
  const token = jwt.sign(
    { email: user.email, role: user.role },
    process.env.secret_key,
    {
      expiresIn: accessTokenValidity(),
    }
  );
  res.locals.token = token;
  return next();
};

module.exports = {
  //   passwordResetToken,
  addUser,
  createPassword,
  login,
  accessToken,
  updateUserById,
};