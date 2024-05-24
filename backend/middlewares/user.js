const { User } = require("../db");
const { signinSchema, signupSchema } = require("../zodschema");
const zod = require("zod");

async function authenticateSignupMiddleware(req, res, next) {
  const body = req.body;
  const parsed = signupSchema.safeParse(body);
  if (!parsed.success) {
    return res.json({
      message: "Email already taken / Incorrect inputs",
    });
  }

  next();
}

function authenticateSigninMiddleware(req, res, next) {
  console.log("authsignin");
  const body = req.body;

  const parsed = signinSchema.safeParse(body);
  if (!parsed.success) {
    return res.status(411).json({
      message: "Error whilelogging in",
    });
  }

  const user = User.findOne({
    username: body.username,
    password: body.password,
  });
  if (user._id) {
    return res.status(411).json({
      message: "User doesnot exist",
    });
  }
  next();
}

module.exports = {
  authenticateSigninMiddleware,
  authenticateSignupMiddleware,
};
