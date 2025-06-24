import express from "express";
import { uploadMemory } from "../utils/fileUpload.js";
import { getAllUsersforAdmin, approveUserforAdmin, deleteUserforAdmin } from "../controllers/userController.js";
import { addProduct, getSellerProducts } from "../controllers/productController.js";
const userRoute = express.Router();

// Admin
userRoute.get("/users", getAllUsersforAdmin);
userRoute.patch("/users/:id/approve", approveUserforAdmin);
userRoute.delete("/users/:id", deleteUserforAdmin);

//Seller
userRoute.post(
  "/addProduct",
  uploadMemory.array("images", 5),  
  addProduct
);
userRoute.get("/sellerProducts/:sellerId", getSellerProducts);
export default userRoute;
