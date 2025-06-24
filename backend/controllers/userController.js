import { db } from "../services/firebaseClient.js";

// Admin Get all users
export async function getAllUsersforAdmin(req, res, next) {
  try {
    const snapshot = await db.collection("users").get();
    const users = [];
    snapshot.forEach(doc => {
      users.push({ id: doc.id, ...doc.data() });
    });
    res.json(users);
  } catch (err) {
    console.error("GET ALL USERS ERROR:", err);
    next(err);
  }
}

// Admin Approve or update status of a user
export async function approveUserforAdmin(req, res, next) {
  try {
    const { id } = req.params;
    const { status } = req.body;
    await db.collection("users").doc(id).update({ status: status || "approved" });
    res.json({ message: `User ${id} updated to status ${status || "approved"}` });
  } catch (err) {
    console.error("APPROVE USER ERROR:", err);
    next(err);
  }
}

// Admin Delete a user
export async function deleteUserforAdmin(req, res, next) {
  try {
    const { id } = req.params;
    await db.collection("users").doc(id).delete();
    res.json({ message: `User ${id} deleted.` });
  } catch (err) {
    console.error("DELETE USER ERROR:", err);
    next(err);
  }
}
