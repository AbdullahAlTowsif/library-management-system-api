import express, { Request, Response, NextFunction } from "express";
import { Borrow } from "../models/borrow.model";

export const borrowRoutes = express.Router();

borrowRoutes.post("/", async (req: Request, res: Response, next: NextFunction) => {
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
