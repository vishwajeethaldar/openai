import path from "path";
import "dotenv/config";
import * as express from "express";
import express__default from "express";
import cors from "cors";
const handleDemo = (req, res) => {
  const response = {
    message: "Hello from Express server"
  };
  res.status(200).json(response);
};
const ideasStore = /* @__PURE__ */ new Map();
const getIdeas = (_req, res) => {
  const ideas = Array.from(ideasStore.values()).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  const response = { ideas };
  res.json(response);
};
const createIdea = (req, res) => {
  const { title, description } = req.body;
  if (!title || !description) {
    res.status(400).json({ error: "Title and description are required" });
    return;
  }
  const id = Date.now().toString();
  const idea = {
    id,
    title,
    description,
    createdAt: (/* @__PURE__ */ new Date()).toISOString()
  };
  ideasStore.set(id, idea);
  const response = { idea };
  res.status(201).json(response);
};
const deleteIdea = (req, res) => {
  const { id } = req.params;
  if (!ideasStore.has(id)) {
    res.status(404).json({ error: "Idea not found" });
    return;
  }
  ideasStore.delete(id);
  res.status(200).json({ success: true });
};
function createServer() {
  const app2 = express__default();
  app2.use(cors());
  app2.use(express__default.json());
  app2.use(express__default.urlencoded({ extended: true }));
  app2.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });
  app2.get("/api/demo", handleDemo);
  app2.get("/api/ideas", getIdeas);
  app2.post("/api/ideas", createIdea);
  app2.delete("/api/ideas/:id", deleteIdea);
  return app2;
}
const app = createServer();
const port = process.env.PORT || 3e3;
const __dirname = import.meta.dirname;
const distPath = path.join(__dirname, "../spa");
app.use(express.static(distPath));
app.get("/*", (req, res) => {
  if (req.path.startsWith("/api/") || req.path.startsWith("/health")) {
    return res.status(404).json({ error: "API endpoint not found" });
  }
  res.sendFile(path.join(distPath, "index.html"));
});
app.listen(port, () => {
  console.log(`🚀 Fusion Starter server running on port ${port}`);
  console.log(`📱 Frontend: http://localhost:${port}`);
  console.log(`🔧 API: http://localhost:${port}/api`);
});
process.on("SIGTERM", () => {
  console.log("🛑 Received SIGTERM, shutting down gracefully");
  process.exit(0);
});
process.on("SIGINT", () => {
  console.log("🛑 Received SIGINT, shutting down gracefully");
  process.exit(0);
});
//# sourceMappingURL=node-build.mjs.map
