const express = require("express");
const userModel = require("../../models/user/user");

const route = express();

route.get("/user", async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(200).send(users);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "something went wrong",
    });
  }
});

route.get("/user/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const user = await userModel.findById(_id);
    res.status(200).send({ data: user });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "something went wrong",
    });
  }
});

route.post("/user", async (req, res) => {
  try {
    const newUser = new userModel(req.body);
    await newUser.save();
    res.status(201).send({ message: "New user created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "something went wrong",
    });
  }
});

route.patch("/user/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const user = await userModel.findByIdAndUpdate(_id, req.body);
    res.status(200).send({ message: "user updated successfully", data: user });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "something went wrong",
    });
  }
});

route.delete("/user/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    await userModel.findByIdAndDelete(_id);
    res.status(200).send({ message: "user deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "something went wrong",
    });
  }
});

module.exports = route;
