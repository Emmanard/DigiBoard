import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

import notesRoute from "./routes/notes.route.js";
import { connectDb } from "./lib/db.js";
import rateLimiter from "./middleware/rateLimiter.js";


dotenv.config()


const app = express();

;

const PORT = process.env.PORT || 5001
const __dirname = path.resolve();

// middleware
if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173",
    })
  );
}

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(rateLimiter);

// Routes
app.use("/api/notes", notesRoute);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

// Health check endpoint (optional but useful)
app.get("/api/health", (req, res) => {
  res.status(200).json({ 
    status: "OK", 
    message: "Server is running",
    environment: process.env.NODE_ENV 
  });
});


// Start server
connectDb().then(() => {
  app.listen(PORT, () => {
    console.log("Server started on PORT:", PORT);
  });
});
