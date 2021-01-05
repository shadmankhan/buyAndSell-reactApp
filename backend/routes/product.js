const router = require("express").Router();
let Product = require("../models/product.model");
let User = require("../models/user.model");

// router.route("/").get((req, res) => {
//   Product.find()
//     .then((products) => res.json(products))
//     .catch((e) => res.status(400).json(e));
// });
// let finalProducts = [];

// router.route("/").get((req, res) => {
//   Product.find()
//     .then((products) => {
//       products.map((product) => {
//         User.find({ _id: product.createdBy })
//           .then((user) => {
//             finalProducts.push({
//               ...product["_doc"],
//               user,
//             });
//           })
//           .catch((e) => res.status(400).json(e));
//       });
//     })
//     .finally(() => res.json({ products: finalProducts, status: "Success" }))
//     .catch((e) => res.status(400).json(e));
// });

router.route("/").get((req, res) => {
  Product.find()
    .then((products) => {
      if (products != []) {
        res.json({ products: products, status: "Success" });
      } else {
        res.json({ products: [], status: "Failed" });
      }
    })
    .catch((e) => res.status(400).json(e));
});

router.route("/").post((req, res) => {
  const sellerDetails = req.body.sellerDetails;
  const productTitle = req.body.productTitle;
  const productImage = req.body.productImage;
  const dateOfPurchase = req.body.dateOfPurchase;
  const productDescription = req.body.productDescription;
  const availabilityArea = req.body.availabilityArea;
  const costPrice = req.body.costPrice;
  const sellingPrice = req.body.sellingPrice;

  const newProduct = new Product({
    sellerDetails,
    productTitle,
    productImage,
    dateOfPurchase,
    productDescription,
    availabilityArea,
    costPrice,
    sellingPrice,
  });

  newProduct
    .save()
    .then(() => res.json("Product added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
