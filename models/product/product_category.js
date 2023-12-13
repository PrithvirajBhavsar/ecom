const mongoose = require("mongoose");

const productCategorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product_category"
    }
  },
  {
    timestamps: true,
  }
);

const productCategoryModel = new mongoose.model("product_category", productCategorySchema);

module.exports = productCategoryModel;
