// services/firebaseAdmin.js
import admin from "firebase-admin";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config();

// point to wherever your JSON lives
const serviceAccountPath = path.resolve("backend/services/serviceAccountKey.json");
const serviceAccount = JSON.parse(
  fs.readFileSync(serviceAccountPath, "utf-8")
);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    databaseURL: process.env.FIREBASE_DATABASE_URL, 
  });
}

// now export everything you need
export const auth       = admin.auth();
export const db         = admin.firestore();
export const FieldValue = admin.firestore.FieldValue;
export const bucket     = admin.storage().bucket();

export default admin;
