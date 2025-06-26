import { db, bucket as storage } from "../services/firebaseClient.js";
import { v4 as uuidv4 } from "uuid";

async function uploadProductImage(file) {
  const ext = file.originalname.split('.').pop();
  const filename = `products/${uuidv4()}.${ext}`;
  const fileRef = storage.file(filename);

  await fileRef.save(file.buffer, {
    contentType: file.mimetype,
    public: true,
    metadata: { firebaseStorageDownloadTokens: uuidv4() },
  });

  return `https://storage.googleapis.com/${storage.name}/${filename}`;
}

export async function addProduct(req, res, next) {
  try {
    const { name, category, price, quantity, description, sellerId } = req.body;
    if (!name || !category || !price || !quantity || !sellerId) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    let image_urls = [];
    if (req.files && req.files.length) {
      for (const file of req.files) {
        const url = await uploadProductImage(file);
        image_urls.push(url);
      }
    }

    const docRef = await db.collection("products").add({
      name,
      category,
      price: parseFloat(price),
      quantity: parseInt(quantity),
      description,
      image_urls, // array
      sellerId,
      createdAt: new Date(),
    });

    res.json({ id: docRef.id, message: "Product added successfully." });
  } catch (err) {
    console.error("Add Product Error:", err);
    next(err);
  }
}

//Get Product of the seller
export async function getSellerProducts(req, res, next) {
  try {
    const { sellerId } = req.params;
    if (!sellerId) return res.status(400).json({ error: "Missing sellerId." });

    const productsSnap = await db
      .collection("products")
      .where("sellerId", "==", sellerId)
      .orderBy("createdAt", "desc")
      .get();

    const products = [];
    productsSnap.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() });
    });

    res.json(products);
  } catch (err) {
    console.error("Get Seller Products Error:", err);
    next(err);
  }
}

//Get all the products for Buyer
export async function getAllProducts(req, res, next) {
  try {
    const snap = await db
      .collection("products")
      .orderBy("createdAt", "desc")
      .get();

    const products = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(products);
  } catch (err) {
    console.error("Get All Products Error:", err);
    next(err);
  }
}

