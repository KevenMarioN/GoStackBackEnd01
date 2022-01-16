import express, { NextFunction, Request, Response } from 'express';
import { isUuid, uuid } from 'uuidv4';

type Projects = {
  id: string;
  title: string
  owner: string
}

const logRequests = (request: Request, response: Response, next: NextFunction) => {
  const { method, url } = request;

  const logLabel = `[${method.toUpperCase()}] ${url}`
  console.log(logLabel);
  return next();
}


const validateProjectId = (request: Request, response: Response, next: NextFunction) => {
  const { id } = request.params;
  if (!isUuid(id))
    return response.status(400).json({ error: "Invalid project ID" })
  return next();
}

const app = express();

app.use(express.json());
app.use(logRequests);
const projects: Projects[] = [];

app.get('/projects', (request: Request, response: Response) => {
  const { title } = request.query;

  const results = title ? projects.filter(project => project.title.includes(String(title)))
    : projects;
  return response.json(results)
});

app.post("/projects", (request: Request, response: Response) => {
  const { title, owner } = request.body;
  const project = { id: uuid(), title, owner };
  projects.push(project)
  return response.json(project)
})

app.put("/projects/:id", validateProjectId, (request: Request, response: Response) => {
  const { id } = request.params;
  const { title, owner } = request.body;

  const projectIndex = projects.findIndex(project => project.id === id);

  if (projectIndex < 0)
    return response.status(400).json({ error: "ID não encontrado" });

  const project = {
    id,
    title,
    owner
  }
  projects[projectIndex] = project;

  return response.json(project)
})

app.delete("/projects/:id", validateProjectId, (request: Request, response: Response) => {
  const { id } = request.params;
  const projectIndex = projects.findIndex(project => project.id === id);
  if (projectIndex < 0)
    return response.status(400).json({ error: "ID não encontrado" });

  projects.splice(projectIndex, 1);
  return response.status(204).send();
})

app.listen(3333, () => {
  console.log('Rodando na Porta 3333!')
});

export default app;