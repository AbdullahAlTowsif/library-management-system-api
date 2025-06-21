"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const errorHandler = (err, req, res, next) => {
    // Handle Mongoose ValidationError
    if (err instanceof mongoose_1.default.Error.ValidationError) {
        const formattedErrors = {};
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
            }
            else {
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
    else {
        res.status(500).json({
            message: err.message || "Something went wrong",
            success: false,
            error: err,
        });
    }
};
exports.default = errorHandler;
