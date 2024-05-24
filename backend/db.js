const mongoose = require("mongoose");
const { required } = require("nodemon/lib/config");
const { Schema, number } = require("zod");

mongoose.connect(
  "mongodb+srv://komalsingh4397:ktrzK9RrR6eb39Ah@cluster0.e4zerd4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
);

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  firstname: String,
  lastname: String,
});

const User = mongoose.model("User", userSchema);

const accountSchema = new mongoose.Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
});
const Account = mongoose.model("Account", accountSchema);

module.exports = {
  User,
  Account,
};
