const express = require("express");
const productCategoryModel = require("../../models/product/product_category");

const route = express();

route.get("/product-category", async (req, res) => {
  try {
    const productCategories = await productCategoryModel.find().populate("parent");
    res.status(200).send(productCategories);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "something went wrong",
    });
  }
});

route.get("/product-category/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const productCategory = await productCategoryModel.findById(_id);
    res.status(200).send({ data: productCategory });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "something went wrong",
    });
  }
});

route.post("/product-category", async (req, res) => {
  try {
    const newProductCategory = new productCategoryModel(req.body);
    await newProductCategory.save();
    res.status(201).send({ message: "New product category created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "something went wrong",
    });
  }
});

route.patch("/product-category/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const productCategory = await productCategoryModel.findByIdAndUpdate(_id, req.body);
    res.status(200).send({ message: "product category updated successfully", data: productCategory });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "something went wrong",
    });
  }
});

route.delete("/product-category/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    await productCategoryModel.findByIdAndDelete(_id);
    res.status(200).send({ message: "product category deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "something went wrong",
    });
  }
});

module.exports = route;
