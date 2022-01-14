import express, { Request, Response } from 'express';

const app = express();

app.get('/projects', (request: Request, response: Response) => {
  return response.json([
    'Projeto 1',
    'Projeto 2'
  ])
});

app.post("/projects", (request: Request, response: Response) => {
  return response.json([
    'Projeto 1',
    'Projeto 2',
    'Projeto 3'
  ])
})

app.put("/projects/:id", (request: Request, response: Response) => {
  return response.json([
    'Projeto 4',
    'Projeto 2',
    'Projeto 3'
  ])
})

app.delete("/projects/:id",(request :Request,response : Response) =>{
  return response.json([
    'Projeto 2',
    'Projeto 3'
  ])
})

  app.listen(3333, () => {
    console.log('Rodando na Porta 3333!')
  });

  export default app;