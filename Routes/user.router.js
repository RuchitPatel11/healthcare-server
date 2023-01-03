const router = require("express").Router();
const userController = require("../controllers/user.controller");
const tokenController = require("../controllers/token.controller");
const {
  User,
  validateUpdateUser,
} = require("../Models/user.model");
const auth = require("../middlewares/auth");

// Verify Token
router.get("/token/verify", tokenController.verifyToken, (req, res, next) => {
  res.send();
});

// Regenerate new token
router.get(
  "/token/regenerate",
  tokenController.regenerateToken,
  (req, res, next) => {
    res.send();
  }
);

// Create user password if token is valid
router.put(
  "/setPassword",
  tokenController.verifyToken,
  userController.createPassword,
  (req, res, next) => {
    res.send();
  }
);

// Login
router.post(
  "/login",
  userController.login,
  userController.accessToken,
  (req, res) => {
    const { user, token } = res.locals;
    res.send({
      token,
      user,
    });
  }
);

// Reset password
// router.post("/passwordReset", userController.passwordResetToken, (req, res) => {
//   res.send();
// });

// Create new user
router.post(
  "/register",

  userController.addUser,
  (req, res) => {
    res.send();
  }
);

// // Update existing user
router.put(
  "/update/:id",
  validateUpdateUser,
  userController.updateUserById,
  (req, res) => {
    res.send();
  }
);

// Middlewares
router.use(auth);

module.exports = router;
