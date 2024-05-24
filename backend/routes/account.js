const express = require("express");
const { mongoose } = require("mongoose");

const { authMiddleware } = require("../middlewares/middleware");
const { Account } = require("../db");

const router = express.Router();

router.get("/balance", authMiddleware, async (req, res) => {
  const account = await Account.findOne({
    userid: req.userid,
  });
  res.json({
    balance: account.balance,
  });
});

router.post("/transfer", authMiddleware, async (req, res) => {
  try {
    const fromAccountid = req.userid;
    const toAccountid = req.body.to;
    const amount = req.body.amount;
    const session = await mongoose.startSession();

    session.startTransaction();
    const senderAccount = await Account.findOne({
      userid: fromAccountid,
    }).session(session);

    if (!senderAccount || senderAccount.balance < amount) {
      await session.abortTransaction();
      res.status(400).json({
        message: "Insufficient balance",
      });
    }

    const recieverAccount = await Account.findOne({
      userid: toAccountid,
    }).session(session);

    if (!recieverAccount) {
      await session.abortTransaction();
      res.status(400).json({
        message: "invalid account",
      });
    }

    await Account.updateOne(
      { userid: fromAccountid },
      { $inc: { balance: -amount } }
    ).session(session);

    await Account.updateOne(
      { userid: toAccountid },
      { $inc: { balance: amount } }
    ).session(session);

    await session.commitTransaction();
    res.json({
      message: "Transfer Successful",
    });
  } catch (err) {
    res.status(400).json({
      message: "Error occurred transaction failed",
    });
  }
});

module.exports = router;
