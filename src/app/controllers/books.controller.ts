import express, { Request, Response } from "express";
import { Book } from "../models/books.model";

export const booksRoutes = express.Router();


booksRoutes.post('/books', async(req:Request, res: Response) => {
    try {
        const body = req.body;

        const books = await Book.create(body);

        res.status(201).json({
            success: true,
            message: "Book created successfully",
            data: books
        })
    } catch (error) {
        console.log(error);
    }
})