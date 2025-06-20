import express, { Application, Request, Response } from "express";
import { booksRoutes } from "./app/controllers/books.controller";
import errorHandler from "./app/middlewares/errorHandler";
import { borrowRoutes } from "./app/controllers/borrow.controller";

const app: Application = express();
app.use(express.json());

app.use('/api', booksRoutes);
app.use('/api/borrow', borrowRoutes);

app.use(errorHandler);

app.get('/', (req: Request, res: Response) => {
    res.send("Welcome to Library Management System");
})

export default app;