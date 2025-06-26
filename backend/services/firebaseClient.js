import admin from "firebase-admin";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
dotenv.config();


const serviceAccount = JSON.parse(
  fs.readFileSync(path.resolve("backend/services/serviceAccountKey.json"), "utf-8")
);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  });
}

export const auth = admin.auth();
export const db = admin.firestore();
export const bucket = admin.storage().bucket();
export default admin;
