import express, { Request, Response, NextFunction } from "express";
import { Borrow } from "../models/borrow.model";

export const borrowRoutes = express.Router();

// post request: borrow books
borrowRoutes.post(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { book, quantity } = req.body;

      if (!book || !quantity) {
        res.status(400).json({
          message: "Book ID and quantity are required",
          success: false,
        });
      }

      const borrow = await Borrow.borrowAndUpdate(book, quantity);

      res.status(201).json({
        message: "Book borrowed successfully",
        success: true,
        data: borrow,
      });
    } catch (error) {
      next(error);
    }
  }
);

// get request: borrow books summary
borrowRoutes.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const summary = await Borrow.aggregate([
        {
          $group: {
            _id: "$book",
            totalQuantity: { $sum: "$quantity" },
          },
        },
        {
          $lookup: {
            from: "books",
            localField: "_id",
            foreignField: "_id",
            as: "bookDetails",
          },
        },
        {
          $unwind: "$bookDetails",
        },
        {
          $project: {
            _id: 0,
            book: {
              title: "$bookDetails.title",
              isbn: "$bookDetails.isbn",
            },
            totalQuantity: 1,
          },
        },
      ]);

      res.status(200).json({
        success: true,
        message: "Borrowed books summary retrieved successfully",
        data: summary,
      });
    } catch (error) {
      next(error);
    }
  }
);
