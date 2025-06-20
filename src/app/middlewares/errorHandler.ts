import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

const errorHandler: ErrorRequestHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Handle Mongoose ValidationError
  if (err instanceof mongoose.Error.ValidationError) {
    const formattedErrors: Record<string, any> = {};

    for (const field in err.errors) {
      const error = err.errors[field];

      if ("properties" in error) {
        formattedErrors[field] = {
          message: error.message,
          name: error.name,
          properties: error.properties,
          kind: error.kind,
          path: error.path,
          value: error.value,
        };
      } else {
        formattedErrors[field] = {
          message: error.message,
          name: error.name,
          kind: error.kind,
          path: error.path,
          value: error.value,
        };
      }
    }

    res.status(400).json({
      message: "Validation failed",
      success: false,
      error: {
        name: "ValidationError",
        errors: formattedErrors,
      },
    });
  }

  res.status(500).json({
    message: err.message || "Something went wrong",
    success: false,
    error: err,
  });
};

export default errorHandler;
