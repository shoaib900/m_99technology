const { User } = require("../model/user");
const bcrypt = require("bcryptjs");

const getAllUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find();
  } catch (error) {
    return console.log(error);
  }
  if (!users) {
    return res.status(404).json({ message: "users are not found" });
  }
  return res.status(200).json({ users });
};

const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  let existUser;
  try {
    existUser = await User.findOne({ email });
  } catch (error) {
    return console.log(error);
  }
  if (existUser) {
    return res.status(400).json({ message: "user already exist" });
  }
  const hashedPassword = bcrypt.hashSync(password);
  const user = new User({
    username,
    email,
    password: hashedPassword,
  });
  try {
    await user.save();
  } catch (error) {
    return console.log(error);
  }
  return res.status(201).json({ user });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  let existUser;
  try {
    existUser = await User.findOne({ email });
  } catch (error) {
    return console.log(error);
  }
  if (!existUser) {
    return res.status(404).json({ message: "user are not founded" });
  }
  const isPasswordCorrect = bcrypt.compareSync(password, existUser.password);
  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "password is incorrect" });
  }
  return res.status(200).json({ message: "Login successfully" });
};

module.exports = { getAllUsers, signup, login };
