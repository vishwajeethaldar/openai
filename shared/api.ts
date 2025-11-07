export interface DemoResponse {
  message: string;
}

export interface Idea {
  id: string;
  title: string;
  description: string;
  createdAt: string;
}

export interface GetIdeasResponse {
  ideas: Idea[];
}

export interface CreateIdeaRequest {
  title: string;
  description: string;
}

export interface CreateIdeaResponse {
  idea: Idea;
}
