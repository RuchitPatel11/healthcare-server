const router = require("express").Router();
const userController = require("../controllers/user.controller");
const tokenController = require("../controllers/token.controller");

const authentication = require("../middlewares/authentication");

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

// Reset Password
router.post(
  "/passwordReset",
  userController.passwordResetToken,
  (req, res, next) => {
    res.send();
  }
);

// Create New User
router.post("/register", userController.addUser);

// Update User
router.put("/update/:id", userController.updateUserById);

// Delete User
router.delete("/delete/:id", userController.deleteUserById);

// Middlewares
// router.use(auth);

module.exports = router;
