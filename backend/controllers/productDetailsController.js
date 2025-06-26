import admin, { db, FieldValue } from "../services/firebaseAdmin.js";

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
    console.log(req.params, req.body);

    const { id: productId } = req.params;
    const { userId, score, comment = "" } = req.body;
    if (!userId || score == null) {
      return res.status(400).json({ error: "Missing rating info." });
    }

    const newDoc = await db.collection("ratings").add({
      productId,
      userId,
      score: Number(score),
      comment,
      createdAt: FieldValue.serverTimestamp(),
    });

    return res.json({ id: newDoc.id, message: "Rating added." });
  } catch (err) {
    console.error( err);
    next(err);
  }
}
