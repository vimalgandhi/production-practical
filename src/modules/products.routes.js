const express = require("express");
const app = express();
const router = express.Router();
const productController = require("./products.controller");
const multer = require("multer");
const path = require("path");


app.use("/uploads", express.static("uploads"));
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage: storage });



router.get("/products-list", productController.getProductList);
router.post("/create-product", productController.createProduct);
router.put("/update-product", productController.updateProduct);
router.delete("/delete-product/:product_id", productController.deleteProduct);
// router.post("/upload-file", productController.uploadXlsxFile);
router.post("/upload-file", upload.single('file'), productController.uploadXlsxFile)

module.exports = router;

