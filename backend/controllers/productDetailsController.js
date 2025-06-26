import admin, { db, bucket, FieldValue } from "../services/firebaseAdmin.js";

export async function getProductById(req, res, next) {
  try {
    const { id } = req.params;
    const prodSnap = await db.collection("products").doc(id).get();
    if (!prodSnap.exists) {
      return res.status(404).json({ error: "Product not found." });
    }
    const data = prodSnap.data();

    let seller = null;
    if (data.sellerId) {
      let sellerSnap = await db.collection("users").doc(data.sellerId).get();
      if (!sellerSnap.exists) {
        const q = await db
          .collection("users")
          .where("uid", "==", data.sellerId)
          .limit(1)
          .get();
        if (!q.empty) sellerSnap = q.docs[0];
      }

      if (sellerSnap.exists || typeof sellerSnap.data === "function") {
        const raw = sellerSnap.data();

        seller = {
          id: sellerSnap.id,
          fullname:
            raw.fullname   ??
            raw.fullName   ??
            "Unknown Seller",
          profile_url:
            raw.profile_url    ??
            raw.profileUrl     ??
            raw.profileImageUrl ??
            null,
        };
      } else {
        console.warn(data.sellerId);
      }
    }

    const ratingsSnap = await db
      .collection("ratings")
      .where("productId", "==", id)
      .get();

    const ratings = ratingsSnap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const averageRating = ratings.length
      ? ratings.reduce((sum, r) => sum + (r.score || 0), 0) / ratings.length
      : 0;
    const payload = {
      id,
      ...data,
      seller,
      ratings,
      averageRating: Number(averageRating.toFixed(2)),
    };

    return res.json(payload);
  } catch (err) {
    console.error(err);
    next(err);
  }
}

//Add rating to the product
export async function addRating(req, res, next) {
  try {
    const { id: productId } = req.params;
    const { userId, score, comment = "", reportReason } = req.body;

    if (!userId || score == null) {
      return res.status(400).json({ error: "Missing rating info." });
    }

    // build the payload
    const payload = {
      productId,
      userId,
      score:    Number(score),
      comment,
      createdAt: FieldValue.serverTimestamp(),
    };
    // only attach reportReason if the client provided one
    if (reportReason) {
      payload.reportReason = reportReason;
    }

    const newDoc = await db.collection("ratings").add(payload);

    return res.status(201).json({
      id: newDoc.id,
      message: "Rating added.",
      reportReason: payload.reportReason ?? null
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
}

//Place order of the specific products of the seller
// New: get a single user
export async function getUserById(req, res, next) {
  try {
    const { id } = req.params;
    const snap = await db.collection("users").doc(id).get();
    if (!snap.exists) return res.status(404).json({ error: "User not found." });
    return res.json({ id: snap.id, ...snap.data() });
  } catch (err) {
    console.error(err);
    next(err);
  }
}

// New: create an order
export async function createOrder(req, res, next) {
  try {
    const {
      buyerId,
      sellerId,
      productId,
      productName,
      productPrice,
    } = req.body;

    if (!buyerId || !sellerId || !productId) {
      return res.status(400).json({ error: "Missing order info." });
    }

    const newOrder = await db.collection("orders").add({
      buyerId,
      sellerId,
      productId,
      productName,
      productPrice,
      createdAt: FieldValue.serverTimestamp(),
      status: "pending",
    });

    return res.status(201).json({ id: newOrder.id, message: "Order placed." });
  } catch (err) {
    console.error(err);
    next(err);
  }
}

/**
 * GET /returns/:productId
 * Returns { id, name, price, imageUrl }
 */
export async function getReturnData(req, res, next) {
  try {
    const { productId } = req.params;
    const snap = await db.collection("products").doc(productId).get();
    if (!snap.exists) {
      return res.status(404).json({ error: "Product not found." });
    }
    const data = snap.data();
    // pick first image (or null)
    const imageUrl = Array.isArray(data.image_urls) && data.image_urls.length
      ? data.image_urls[0]
      : null;

    return res.json({
      id:    snap.id,
      name:  data.name,
      price: data.price,
      imageUrl
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
}

//Return the Item
export async function returnItem(req, res, next) {
  try {
    const { buyerId, productId, reason } = req.body;
    if (!buyerId || !productId || !reason) {
      return res.status(400).json({ error: "Missing return info." });
    }
    if (!req.file) {
      return res.status(400).json({ error: "Return image is required." });
    }

    const file       = req.file; 
    const timestamp  = Date.now();
    const destPath   = `returns/${productId}/${timestamp}_${file.originalname}`;
    const fileRef    = bucket.file(destPath);

    await fileRef.save(file.buffer, {
      metadata: { contentType: file.mimetype }
    });
    await fileRef.makePublic(); 
    const imageUrl = fileRef.publicUrl();

    const docRef = await db.collection("returns").add({
      buyerId,
      productId,
      reason,
      imageUrl,
      createdAt: FieldValue.serverTimestamp(),
      status:    "pending"
    });

    return res.status(201).json({
      id:       docRef.id,
      message:  "Return request submitted.",
      imageUrl
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
}