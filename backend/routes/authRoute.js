import express from "express";
import { uploadMemory } from "../utils/fileUpload.js";
import { registerBuyer, loginBuyer, forgotPassword, getBuyerProfile,
  registerSeller, loginSeller, getSellerProfile, updateSellerProfile,
  forgotPasswordSeller
} from "../controllers/authController.js";
const authRoutes = express.Router();

//Buyer
authRoutes.post("/registerBuyer",  uploadMemory.fields([
    { name: "profile", maxCount: 1 },
    { name: "id",      maxCount: 1 },
  ]),
  registerBuyer);
authRoutes.post("/loginBuyer", loginBuyer);
authRoutes.post("/forgotPasswordBuyer", forgotPassword);
authRoutes.get("/buyerProfile/:id", getBuyerProfile);

//Seller
authRoutes.post("/registerSeller",
  uploadMemory.fields([
    { name: "profile", maxCount: 1 },
    { name: "id",      maxCount: 1 },
  ]),
  registerSeller
);
authRoutes.post("/loginSeller", loginSeller);
authRoutes.get("/sellerProfile/:id", getSellerProfile);
authRoutes.patch("/updateSellerProfile", updateSellerProfile);
authRoutes.post("/forgotPasswordSeller", forgotPasswordSeller);
export default authRoutes;
