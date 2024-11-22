import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

import connectToMongoDB from "./db/connectTomongoDB.js";
import { app, server } from "./socket/socket.js";

dotenv.config();

// Get the current directory
const __dirname = path.resolve();

// Backend server port
const PORT = process.env.PORT || 8000;

// Middleware
app.use(express.json());
app.use(cookieParser());

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

// Serve frontend static files
app.use(express.static(path.join(__dirname, "/frontend/dist")));

// Handle unmatched routes (SPA fallback)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

// Start the server
server.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server running on http://localhost:${PORT}`);
});
