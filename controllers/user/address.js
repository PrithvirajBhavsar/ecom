const express = require("express");
const addressModel = require("../../models/user/address");

const route = express();

route.get("/address", async (req, res) => {
  try {
    const addresses = await addressModel.find().populate("user");
    res.status(200).send(addresses);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "something went wrong",
    });
  }
});

route.get("/address/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const address = await addressModel.findById(_id);
    res.status(200).send({ data: address });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "something went wrong",
    });
  }
});

route.post("/address", async (req, res) => {
  try {
    const newAddress = new addressModel(req.body);
    await newAddress.save();
    res.status(201).send({ message: "New address created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "something went wrong",
    });
  }
});

route.patch("/address/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const address = await addressModel.findByIdAndUpdate(_id, req.body);
    res.status(200).send({ message: "address updated successfully", data: address });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "something went wrong",
    });
  }
});

route.delete("/address/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    await addressModel.findByIdAndDelete(_id);
    res.status(200).send({ message: "address deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "something went wrong",
    });
  }
});

module.exports = route;
