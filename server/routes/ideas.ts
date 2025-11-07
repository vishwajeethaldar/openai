import { RequestHandler } from "express";
import {
  Idea,
  GetIdeasResponse,
  CreateIdeaResponse,
  CreateIdeaRequest,
} from "@shared/api";

// In-memory storage for ideas (in production, use a real database)
const ideasStore: Map<string, Idea> = new Map();

export const getIdeas: RequestHandler = (_req, res) => {
  const ideas = Array.from(ideasStore.values()).sort(
    (a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const response: GetIdeasResponse = { ideas };
  res.json(response);
};

export const createIdea: RequestHandler = (req, res) => {
  const { title, description } = req.body as CreateIdeaRequest;

  if (!title || !description) {
    res.status(400).json({ error: "Title and description are required" });
    return;
  }

  const id = Date.now().toString();
  const idea: Idea = {
    id,
    title,
    description,
    createdAt: new Date().toISOString(),
  };

  ideasStore.set(id, idea);

  const response: CreateIdeaResponse = { idea };
  res.status(201).json(response);
};

export const deleteIdea: RequestHandler = (req, res) => {
  const { id } = req.params;

  if (!ideasStore.has(id)) {
    res.status(404).json({ error: "Idea not found" });
    return;
  }

  ideasStore.delete(id);
  res.status(200).json({ success: true });
};
