const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  User,
  validateRegister,
  validatePassword,
  validateLogin,
  validateUpdateUser,
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
    await newUser.save();

    res.status(200).send("User Inserted Successfully !!");

    // Generate and save token
    const token = await generateToken();
    const verify = new Token({
      token,
      user: newUser._id,
    });
    await verify.save();
    return;
  } catch (error) {
    return next({ error });
  }
};

//Get all Users
const getUsers = async (req, res, next) => {
  try {
    const user = await User.find();
    if (!user) return res.status(404).send("User Does Not exist");
    res.send(user);
    return;
  } catch (error) {
    return next({ error });
  }
};

// Get User By ID
const getUserById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) return res.status(400).send("User Does Not Exist");
    res.send(user);
    return;
  } catch (error) {
    return next({ error });
  }
};

//Update User By ID
const updateUserById = async (req, res, next) => {
  const { id } = req.params;
  const { error, value } = validateUpdateUser(req.body);
  if (error) return res.status(404).send(error.message);
  try {
    const user = await User.findByIdAndUpdate(id, value);
    if (!user) return res.status(400).send("User Does Not Exist");

    return res.send("User Updated Successfully!!");
  } catch (error) {
    return next({ error });
  }
};

//Delete User
const deleteUserById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) return res.status(400).send("User Does Not Exist");
    res.send("User Deleted");
    return;
  } catch (error) {
    return next({ error });
  }
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
const passwordResetToken = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });

    // Check whether user exists or not
    if (!user) return res.status(401).send("User Does Not Exist!");

    const token = generateToken();

    await Token.findOneAndUpdate(
      { user: user._id },
      { token },
      { upsert: true }
    );
    return next();
  } catch (error) {
    return next({ error });
  }
};

//Verify User
const login = async (req, res, next) => {
  const { error, value } = validateLogin(req.body);

  if (error) return res.status(404).send(error);
  try {
    const user = await User.findOne({ email: value.email });
    if (!user) return res.status(401).send("User Does Not Exist");

    // Check account is verified or not
    // if (!user.isVerified) return res.status(403).send("Account Not Verified");

    // Check password is valid or not
    const passwordValid = await bcrypt.compare(value.password, user.password);

    if (!passwordValid)
      return res.status(401).send("Invalid Username or password");

    res.locals.user = user;
    next();
  } catch (error) {
    return next({ error });
  }
};

// const accessTokenValidity = () => {
//   let dt = new Date();
//   dt.setHours(dt.getHours() + 72);
//   let ut = dt.toLocaleString();
//   return ut;
// };

//Generate Access Token
const accessToken = (req, res, next) => {
  const { user } = res.locals;
  const token = jwt.sign(
    { email: user.email, role: user.role },
    process.env.SECRET_KEY,
    {
      expiresIn: "2d",
    }
  );
  res.locals.token = token;
  return next();
};

module.exports = {
  passwordResetToken,
  addUser,
  getUsers,
  getUserById,
  createPassword,
  login,
  accessToken,
  updateUserById,
  deleteUserById,
};
