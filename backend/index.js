import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoute.js";
import userRoute from "./routes/userRoute.js";
import { db } from "./services/firebaseClient.js"; 
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.use('/userAuth', authRoutes);
app.use('/userRoute', userRoute)

app.use((_, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: err.message || "Internal server error" });
});


async function checkFirebaseConnection() {
  try {
    const snapshot = await db.collection("users").limit(1).get();
    console.log("Firebase Firestore is reachable.");
  } catch (error) {
    console.error("Cannot connect to Firebase:", error.message);
    process.exit(1);
  }
}

checkFirebaseConnection().then(() => {
  app.listen(PORT, () => {
    console.log(`Backend listening on http://localhost:${PORT}`);
  });
});
