const { randomBytes } = require("node:crypto");
const { Token } = require("../Models/token.model");
const generateToken = () => {
  const token = randomBytes(18).toString("hex");
  return token;
};

const verifyToken = async (req, res, next) => {
  const { token } = req.query;

  // Check token is provided or not
  if (!token) return res.status(400).send("Invalid Token");
  try {
    const findToken = await Token.findOne({ token });

    if (!findToken) return res.status(401).send("Invalid Token");

    // Check Expiry Date of Token
    if (new Date().getTime() > findToken.validTill.getTime()) {
      return res.status(401).send("Token Expired!");
    }
    // console.log(new Date().toLocaleString());
    // console.log(findToken.validTill.toLocaleString());
    next();
  } catch (error) {
    return next({ error });
  }
};

const regenerateToken = async (req, res, next) => {
  const { token } = req.query;

  // Check token is provided or not
  if (!token) return res.status(400).send("Invalid Token");
  try {
    const findToken = await Token.findOneAndUpdate(
      { token },
      { token: await generateToken() }
    );
    if (!findToken) return res.status(401).send("Invalid Token");

    return next();
  } catch (error) {
    return next({ error });
  }
};

module.exports = { verifyToken, regenerateToken };
