import express, { Request, Response } from "express";
import { Book } from "../models/books.model";
import { BookQueryParams } from "../interfaces/books.interface";

export const booksRoutes = express.Router();

// post method: create book
booksRoutes.post("/books", async (req: Request, res: Response) => {
  try {
    const body = req.body;

    const books = await Book.create(body);

    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: books,
    });
  } catch (error) {
    console.log(error);
  }
});

// get method: get all books
booksRoutes.get("/books", async (req: Request, res: Response) => {
  try {

    const { filter, sortBy = 'title', sort = 'asc', limit = 10 }: BookQueryParams = req.query;
    let books = [];

    const query: any = {}
    if(filter) {
        query.genre = filter;
    }

    const sortOptions: any = {}
    sortOptions[sortBy] = sort === 'asc' ? 1 : -1

    books = await Book.find(query).sort(sortOptions).limit(Number(limit))

    res.status(200).json({
      success: true,
      message: "Books retrieved successfully",
      data: books,
    });
  } catch (error) {
    console.log(error);
  }
});
