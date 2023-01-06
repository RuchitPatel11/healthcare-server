const jwt = require("jsonwebtoken");
const { User } = require("../Models/user.model");

// Verify token is valid or not
const authentication = async (req, res, next) => {
  let token = req.headers["authorization"];
  if (!token) return res.status(401).send("Not Authorized");

  jwt.verify(token, process.env.SECRET_KEY, async (err, payload) => {
    if (err) return res.status(404).send("Invalid token");

    const user = await User.findOne({ email: payload.email });
    if (!user) return res.status(404).send("User does not exist");

    res.locals.user = user;
    return next();
  });
};

module.exports = authentication;
