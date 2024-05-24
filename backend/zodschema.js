const zod = require("zod");

const signupSchema = zod.object({
  username: zod.string().email(),
  password: zod.string().min(6).max(20),
  firstname: zod.string(),
  lastname: zod.string(),
});

const signinSchema = zod.object({
  username: zod.string().email(),
  password: zod.string().min(6).max(20),
});

const updateSchema = zod.object({
  password: zod.string().min(6).max(20),
  firstname: zod.string(),
  lastname: zod.string(),
});

module.exports = {
  signinSchema,
  signupSchema,
  updateSchema,
};
