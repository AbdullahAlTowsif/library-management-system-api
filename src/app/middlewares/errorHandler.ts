import { ErrorRequestHandler } from "express";
import mongoose from "mongoose";

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  // Handle Mongoose ValidationError
  if (err instanceof mongoose.Error.ValidationError) {
    const formattedErrors: Record<string, any> = {};

    for (const field in err.errors) {
      const error = err.errors[field];

      formattedErrors[field] = {
        message: error.message,
        name: error.name,
        properties: error.properties,
        kind: error.kind,
        path: error.path,
        value: error.value,
      };
    }

    return res.status(400).json({
      message: "Validation failed",
      success: false,
      error: {
        name: "ValidationError",
        errors: formattedErrors,
      },
    });
  }

  // Handle other errors (e.g., CastError, MongoServerError, etc.)
  return res.status(500).json({
    message: err.message || "Something went wrong",
    success: false,
    error: err,
  });
};

export default errorHandler;
