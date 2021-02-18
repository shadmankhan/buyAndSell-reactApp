const router = require("express").Router();
let Product = require("../models/product.model");

router.route("/addProduct").post((req, res) => {
  const {
    sellerDetails,
    productTitle,
    productImage,
    dateOfPurchase,
    productDescription,
    availabilityArea,
    costPrice,
    sellingPrice,
    limit,
  } = req.body;

  const newProduct = new Product({
    sellerDetails,
    productTitle,
    productImage,
    dateOfPurchase,
    productDescription,
    availabilityArea,
    costPrice,
    sellingPrice,
    limit,
  });

  newProduct
    .save()
    .then(() => res.json({ status: 'Success' }))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;