import { PrismaClient } from '../node_modules/.prisma/client';
import express from "express";

const prisma = new PrismaClient();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.raw({ type: "application/vnd.custom-type" }));
app.use(express.text({ type: "text/html" }));

app.get("/scores", async (req, res) => {
  const scores = await prisma.scores.findMany({
    orderBy: { score: "desc" },
  });

  res.json(scores);
});

app.post("/scores", async (req, res) => {
  const score = await prisma.scores.create({
    data: {
      createdAt: new Date(),
      userId: req.body.userId ?? "Empty userId",
      score: req.body.score ?? 0,
    },
  });

  return res.json(score);
});

// app.get("/todos/:id", async (req, res) => {
//   const id = req.params.id;
//   const todo = await prisma.todo.findUnique({
//     where: { id },
//   });

//   return res.json(todo);
// });

// app.put("/todos/:id", async (req, res) => {
//   const id = req.params.id;
//   const todo = await prisma.todo.update({
//     where: { id },
//     data: req.body,
//   });

//   return res.json(todo);
// });

app.delete("/scores/:id", async (req, res) => {
  const id = req.params.id;
  await prisma.scores.delete({
    where: { id },
  });

  return res.send({ status: "ok" });
});

// app.get("/", async (req, res) => {
//   res.send(
//     `
//   <h1>Todo REST API</h1>
//   <h2>Available Routes</h2>
//   <pre>
//     GET, POST /todos
//     GET, PUT, DELETE /todos/:id
//   </pre>
//   `.trim(),
//   );
// });

app.listen(Number(port), "0.0.0.0", () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
