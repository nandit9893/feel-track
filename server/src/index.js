import dotenv from "dotenv";
import connectDB from "./configure/database.js";
import app from "./app.js";

dotenv.config();

let isConnected = false;

export default async function handler(req, res) {
  if (!isConnected) {
    try {
      await connectDB();
      isConnected = true;
    } catch (err) {
      console.error("DB connection failed", err);
      res.status(500).send("DB connection failed");
      return;
    }
  }

  return app(req, res);
}
