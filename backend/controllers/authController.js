//Signup for Buyer
import { auth, db, bucket } from "../services/firebaseClient.js";

export async function registerBuyer(req, res, next) {
  try {
    const { fullname, email, sr_code, campus, password } = req.body;

    if (!fullname || !email || !sr_code || !campus || !password) {
      return res.status(400).json({ error: "Missing required fields." });
    }
    if (!req.files?.profile?.[0] || !req.files?.id?.[0]) {
      return res.status(400).json({ error: "Profile and ID files are required." });
    }

    let userRecord;
    try {
      userRecord = await auth.createUser({
        email,
        password,
        displayName: fullname,
      });
    } catch (err) {

      return res.status(400).json({ error: err.message || "Auth registration failed." });
    }
    const userId = userRecord.uid;

    const profileFile = req.files.profile[0];
    const profileExt  = profileFile.originalname.split(".").pop();
    const profilePath = `profiles/${userId}-${Date.now()}.${profileExt}`;
    const profileStorageFile = bucket.file(profilePath);
    await profileStorageFile.save(profileFile.buffer, {
      contentType: profileFile.mimetype,
    });
    const profile_url = `https://storage.googleapis.com/${bucket.name}/${profilePath}`;

    const idFile = req.files.id[0];
    const idExt  = idFile.originalname.split(".").pop();
    const idPath = `ids/${userId}-${Date.now()}.${idExt}`;
    const idStorageFile = bucket.file(idPath);
    await idStorageFile.save(idFile.buffer, {
      contentType: idFile.mimetype,
    });
    const id_url = `https://storage.googleapis.com/${bucket.name}/${idPath}`;

      
    const userDoc = {
      id: userId,
      role: "buyer",
      fullname,
      email,
      sr_code,
      businessname: null, 
      campus,
      profile_url,
      id_url,
      status: "pending"
    };

    await db.collection("users").doc(userId).set(userDoc);

    res.status(201).json({ user: userDoc });
  } catch (err) {
    console.error("REGISTER BUYER ERROR:", err);
    next(err);
  }
}

//Login for Buyer
export async function loginBuyer(req, res, next) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required." });
    }

    const FIREBASE_API_KEY = process.env.FIREBASE_API_KEY;
    const loginURL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_API_KEY}`;

    const fetch = (await import("node-fetch")).default;
    const response = await fetch(loginURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, returnSecureToken: true }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(401).json({ error: data.error?.message || "Invalid credentials." });
    }
    const userId = data.localId;

    const userDocRef = db.collection("users").doc(userId);
    const userDocSnap = await userDocRef.get();

    if (!userDocSnap.exists) {
      return res.status(404).json({ error: "User not found in database." });
    }
    const userData = userDocSnap.data();

    if (userData.role !== "buyer") {
      return res.status(403).json({ error: "Not a buyer account." });
    }

    res.json({
      message: "Login successful",
      user: {
        id: userId,
        fullname: userData.fullname,
        email: userData.email,
        sr_code: userData.sr_code,
        campus: userData.campus,
        profile_url: userData.profile_url,
        id_url: userData.id_url,
        status: userData.status,
        role: userData.role,
      },
      idToken: data.idToken, 
      refreshToken: data.refreshToken,
    });
  } catch (err) {
    console.error("LOGIN BUYER ERROR:", err);
    next(err);
  }
}

// Forgot Password for Buyer
  export async function forgotPassword(req, res, next) {
    try {
      const { email, newPassword } = req.body;
      if (!email || !newPassword) {
        return res.status(400).json({ error: "Email and new password are required." });
      }

      // Find user by email
      let userRecord;
      try {
        userRecord = await auth.getUserByEmail(email);
      } catch (error) {
        return res.status(404).json({ error: "No account found with that email." });
      }

      try {
        await auth.updateUser(userRecord.uid, { password: newPassword });
      } catch (error) {
        return res.status(500).json({ error: "Failed to update password." });
      }

      res.json({ message: "Password successfully updated." });
    } catch (err) {
      console.error("FORGOT PASSWORD ERROR:", err);
      next(err);
    }
  }
  //Get Buyer Profile
  export async function getBuyerProfile(req, res, next) {
  try {
    const { id } = req.params;
    const userSnap = await db.collection("users").doc(id).get();
    if (!userSnap.exists) {
      return res.status(404).json({ error: "User not found." });
    }
    const user = userSnap.data();
    res.json({
      fullname: user.fullname,
      email: user.email,
      profile_url: user.profile_url || "",
    });
  } catch (err) {
    console.error("GET BUYER PROFILE ERROR:", err);
    next(err);
  }
}

//Seller Register
export async function registerSeller(req, res, next) {
  try {
    const { fullname, email, businessname, campus, password } = req.body;

    if (!fullname || !email || !businessname || !campus || !password) {
      return res.status(400).json({ error: "Missing required fields." });
    }
    if (!req.files?.profile?.[0] || !req.files?.id?.[0]) {
      return res.status(400).json({ error: "Profile and ID files are required." });
    }

    let userRecord;
    try {
      userRecord = await auth.createUser({
        email,
        password,
        displayName: fullname,
      });
    } catch (err) {
      return res.status(400).json({ error: err.message || "Auth registration failed." });
    }
    const userId = userRecord.uid;

    const profileFile = req.files.profile[0];
    const profileExt  = profileFile.originalname.split(".").pop();
    const profilePath = `profiles/${userId}-${Date.now()}.${profileExt}`;
    const profileStorageFile = bucket.file(profilePath);
    await profileStorageFile.save(profileFile.buffer, {
      contentType: profileFile.mimetype,
    });
    const profile_url = `https://storage.googleapis.com/${bucket.name}/${profilePath}`;

    const idFile = req.files.id[0];
    const idExt  = idFile.originalname.split(".").pop();
    const idPath = `ids/${userId}-${Date.now()}.${idExt}`;
    const idStorageFile = bucket.file(idPath);
    await idStorageFile.save(idFile.buffer, {
      contentType: idFile.mimetype,
    });
    const id_url = `https://storage.googleapis.com/${bucket.name}/${idPath}`;

    const userDoc = {
      id: userId,
      role: "seller",
      fullname,
      email,
      businessname,
      campus,
      profile_url,
      id_url,
      status: "pending"
    };

    await db.collection("users").doc(userId).set(userDoc);

    res.status(201).json({ user: userDoc });
  } catch (err) {
    console.error("REGISTER SELLER ERROR:", err);
    next(err);
  }
}

//Seller Login
export async function loginSeller(req, res, next) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required." });
    }

    const userQuery = await db.collection("users")
      .where("email", "==", email)
      .where("role", "==", "seller")
      .limit(1)
      .get();

    if (userQuery.empty) {
      return res.status(400).json({ error: "Seller not found or email incorrect." });
    }

    const user = userQuery.docs[0].data();

    const FIREBASE_API_KEY = process.env.FIREBASE_API_KEY;
    const verifyRes = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, returnSecureToken: true }),
      }
    );
    const verifyData = await verifyRes.json();
    if (!verifyRes.ok) {
      return res.status(400).json({ error: "Incorrect password." });
    }

    return res.json({
      message: "Login successful",
      user: {
        id: user.id,
        fullname: user.fullname,
        email: user.email,
        businessname: user.businessname,
        campus: user.campus,
        profile_url: user.profile_url || "",
        status: user.status,
      },
    });

  } catch (err) {
    console.error("SELLER LOGIN ERROR:", err);
    next(err);
  }
}

//Get Seller Profile
export async function getSellerProfile(req, res, next) {
  try {
    const { id } = req.params;
    const userSnap = await db.collection("users").doc(id).get();

    if (!userSnap.exists) {
      return res.status(404).json({ error: "Seller not found." });
    }

    const user = userSnap.data();

    return res.json({
      fullname: user.fullname,
      email: user.email,
      businessname: user.businessname,
      profile_url: user.profile_url || "", 
    });
  } catch (err) {
    console.error("GET SELLER PROFILE ERROR:", err);
    next(err);
  }
}

  //Seller Forgot Password
  export async function forgotPasswordSeller(req, res, next) {
    try {
      const { email, newPassword, confirmPassword } = req.body;
      if (!email || !newPassword || !confirmPassword) {
        return res.status(400).json({ error: "All fields are required." });
      }
      if (newPassword !== confirmPassword) {
        return res.status(400).json({ error: "Passwords do not match." });
      }

      const usersRef = db.collection("users");
      const snapshot = await usersRef.where("email", "==", email).where("role", "==", "seller").get();

      if (snapshot.empty) {
        return res.status(404).json({ error: "Seller not found." });
      }

      const userDoc = snapshot.docs[0];
      const userId = userDoc.id;

      await auth.updateUser(userId, { password: newPassword });

      return res.json({ message: "Password updated successfully." });
    } catch (err) {
      console.error("FORGOT PASSWORD SELLER ERROR:", err);
      next(err);
    }
  }

  //Update Seller Information
  export async function updateSellerProfile(req, res, next) {
    try {
      const { userId, email, password, businessname } = req.body;

      if (!userId) return res.status(400).json({ error: "Missing userId." });

      let updatedAuth = {};
      if (email || password) {
        updatedAuth = await auth.updateUser(userId, {
          ...(email ? { email } : {}),
          ...(password ? { password } : {}),
        });
      }

      if (businessname) {
        await db.collection("users").doc(userId).update({
          businessname,
          ...(email ? { email } : {}),
        });
      } else if (email) {
        await db.collection("users").doc(userId).update({
          email,
        });
      }
      const userDoc = await db.collection("users").doc(userId).get();
      res.json({
        success: true,
        user: {
          fullname: userDoc.data().fullname,
          email: userDoc.data().email,
          businessname: userDoc.data().businessname,
          profile_url: userDoc.data().profile_url || "",
        },
      });
    } catch (err) {
      console.error("UPDATE SELLER PROFILE ERROR:", err);
      return res.status(500).json({ error: err.message || "Failed to update seller profile." });
    }
  }
 