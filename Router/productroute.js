const express = require("express");
const router = express.Router();
const upload = require("../config/multer");
const productController = require("../controller/productcontroller");

router.get("/products", productController.getallProduct);

router.get("/add-product", productController.getProduct);

router.post(
  "/add-product",
  upload.single("file"),
  productController.postAddProduct
);

router.get("/delete-prod/:id", productController.getDeleteProd);

router.get("/update-prod/:id", productController.getEditUpdate);

router.post(
  "/editProduct",
  upload.single("file"),
  productController.postEditProduct
);

//>>>>>>>>>>>>>>>>>>>>>> Categorieys >>>>>>>>>>>>>>>>>>>>>>>

router.get("/addcategories",productController.getcategories)

router.post("/addcategories",productController.postcategories)

router.get("/delete-categoriey/:id",productController.getDeleteCategories)

router.get("/update-categoriey/:id",productController.getUpdateCategories)

router.post("/editCategoriey",productController.postCategories)
module.exports = router;
