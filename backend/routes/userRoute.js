import express from "express";
import { uploadMemory } from "../utils/fileUpload.js";
import { getAllUsersforAdmin, approveUserforAdmin, deleteUserforAdmin } from "../controllers/userController.js";
import { addProduct, getSellerProducts, getAllProducts } from "../controllers/productController.js";
import { getProductById, addRating } from "../controllers/productDetailsController.js";
import {
  sendMessageRTDB,
  getUserChatsRTDB,
  getChatMessagesRTDB
} from "../controllers/chatRtdbController.js";

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

//Buyer
userRoute.get("/products/:id", getProductById);
userRoute.post("/products/:id/ratings", addRating);
userRoute.get("/getAllProducts", getAllProducts);

//Realtime Chats
userRoute.post("/send", sendMessageRTDB);
userRoute.get("/user/:userId", getUserChatsRTDB);
userRoute.get("/:chatId/messages", getChatMessagesRTDB);
export default userRoute;
