const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    sellerDetails: {
      sellerId: {
        type: String,
        required: true,
      },
      sellerName: {
        type: String,
        required: true,
        trim: true,
      },
    },
    productTitle: {
      type: String,
      required: true,
      trim: true,
    },
    productImage: {
      type: String,
      required: false,
    },
    dateOfPurchase: {
      type: String,
      required: true,
    },
    productDescription: {
      type: String,
      required: true,
      trim: true,
    },
    availabilityArea: {
      country: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
    },
    costPrice: {
      value: {
        type: Number,
        required: true,
      },
      unit: {
        type: String,
        required: true,
      },
    },
    sellingPrice: {
      value: {
        type: Number,
        required: true,
      },
      unit: {
        type: String,
        required: true,
      },
    },
    limit: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
