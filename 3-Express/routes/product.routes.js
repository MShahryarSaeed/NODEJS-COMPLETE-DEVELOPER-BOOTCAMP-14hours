const express=require("express");
const {GetAllProducts, AddProduct, DeleteProduct}=require("../controllers/productCtrl");
const productRoutes=express.Router();

// Routes
productRoutes.get("/GetAllProducts",GetAllProducts);
productRoutes.post("/add-product",AddProduct);
productRoutes.delete("/delete/:productId",DeleteProduct)

module.exports=productRoutes;