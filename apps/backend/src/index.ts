import express from 'express';
import cors from 'cors';
import admin from 'firebase-admin';
import prisma from './db/prisma';

// Initialize Firebase Admin (Download serviceAccountKey.json from Firebase Console)
// Set GOOGLE_APPLICATION_CREDENTIALS in env to point to this file path
// OR initialize with object directly
const serviceAccount = require('../serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const app = express();

app.use(cors());
app.use(express.json());

app.get("/" , (req, res) => {
  res.send("TPO Notice Board SERVER is UP!");
})

// 1. Endpoint to Save Token from Frontend
app.post('/api/save-token', async (req, res) => {
  const { token } = req.body;
  if (!token) return res.status(400).send("Token required");

  try {
    await prisma.deviceToken.upsert({
      where: { token },
      update: {},
      create: { token }
    });
    res.status(200).send({ message: "Token saved" });
  } catch (e) {
    console.error(e);
    res.status(500).send("Error saving token");
  }
});

// 2. Endpoint for Admin to Post Notice & Notify All
app.post('/api/create-notice', async (req, res) => {
  const { title, content } = req.body;

  try {
    // A. Save to DB
    const notice = await prisma.notice.create({
      data: { title, content }
    });

    // B. Get all tokens
    const devices = await prisma.deviceToken.findMany();
    const tokens = devices.map((d: any) => d.token);

    if (tokens.length > 0) {
      // C. Send Notification via Firebase
      const message = {
        notification: {
          title: `New TPO Notice: ${title}`,
          body: content.substring(0, 100) + "..."
        },
        tokens: tokens,
      };

      await (admin.messaging() as any).sendMulticast(message);
    }

    res.json({ success: true, notice });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to create notice" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port http://localhost:${PORT}`));