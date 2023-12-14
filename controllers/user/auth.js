const express = require("express");
const userModel = require("../../models/user/user");
const bcrypt = require("bcrypt");

const route = express();

route.post("/login-user", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });
    const correctPassword = await bcrypt.compare(password, user?.password || "");

    if (correctPassword) {
      res.status(200).send(user);
      return;
    }

    res.status(401).send({
      message: "invalid credentials",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "something went wrong",
    });
  }
});

route.post("/signup-user", async (req, res) => {
  const { password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const newUser = new userModel({ ...req.body, password: hashedPassword });
    await newUser.save();
    res.status(200).send({ data: newUser });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "something went wrong",
    });
  }
});

module.exports = route;
