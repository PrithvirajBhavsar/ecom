const mongoose = require("mongoose");

const addressSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    building_no: {
      type: String,
      required: true,
    },
    street: {
      type: String,
      required: true,
    },
    pin_code: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const addressModel = new mongoose.model("address", addressSchema);

module.exports = addressModel;
