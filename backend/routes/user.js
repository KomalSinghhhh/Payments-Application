const express = require("express");
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config");
const { Account, User } = require("../db");
const { authMiddleware } = require("../middlewares/middleware");
const {
  authenticateSigninMiddleware,
  authenticateSignupMiddleware,
} = require("../middlewares/user");
const { updateSchema } = require("../zodschema");

const router = express.Router();

router.post("/signup", authenticateSignupMiddleware, async (req, res) => {
  const body = req.body;
  const user = await User.findOne({
    username: body.username,
  });
  if (user != null) {
    return res.json({
      message: "Email already taken / Incorrect inputs",
    });
  }
  const createUser = await User.create(body);
  const createdUserid = createUser._id;
  await Account.create({
    userid: createdUserid,
    balance: 1 + Math.random() * 10000,
  });
  const token = jwt.sign({ userid: createUser._id }, JWT_SECRET);
  res.json({
    message: "User created successfully",
    token: token,
  });
});

router.post("/signin", authenticateSigninMiddleware, async (req, res) => {
  console.log("Signin");
  const body = req.body;
  const user = await User.findOne({
    username: body.username,
  });
  if (!user._id) {
    return res.json({
      message: "User doesnot exist",
    });
  }
  const token = jwt.sign({ userid: user._id }, JWT_SECRET);
  res.status(200).json({
    token: token,
  });
});

router.put("/", authMiddleware, async (req, res) => {
  const body = req.body;
  const parsed = updateSchema.safeParse(body);
  if (!parsed.success) {
    res.status(411).json({
      message: "Error while updating information",
    });
  }

  await User.updateOne({ _id: req.userid }, req.body);

  res.json({
    message: "updated successfully",
  });
});

router.get("/bulk", async (req, res) => {
  const filter = req.query.filter || "";
  const users = await User.find({
    $or: [
      {
        firstname: {
          $regex: filter,
        },
      },
      {
        lastname: {
          $regex: filter,
        },
      },
    ],
  });

  res.json({
    user: users.map((user) => ({
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname,
      _id: user._id,
    })),
  });
});

module.exports = router;
