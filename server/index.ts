import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { getIdeas, createIdea, deleteIdea } from "./routes/ideas";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // Ideas API routes
  app.get("/api/ideas", getIdeas);
  app.post("/api/ideas", createIdea);
  app.delete("/api/ideas/:id", deleteIdea);

  return app;
}
