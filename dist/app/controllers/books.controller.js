"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.booksRoutes = void 0;
const express_1 = __importDefault(require("express"));
const books_model_1 = require("../models/books.model");
exports.booksRoutes = express_1.default.Router();
// post request: create book
exports.booksRoutes.post("/books", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const books = yield books_model_1.Book.create(body);
        res.status(201).json({
            success: true,
            message: "Book created successfully",
            data: books,
        });
    }
    catch (error) {
        // console.log(error);
        next(error);
    }
}));
// get request: get all books
exports.booksRoutes.get("/books", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { filter, sortBy = "title", sort = "asc", limit = 10, } = req.query;
        let books = [];
        const query = {};
        if (filter) {
            query.genre = filter;
        }
        const sortOptions = {};
        sortOptions[sortBy] = sort === "asc" ? 1 : -1;
        books = yield books_model_1.Book.find(query).sort(sortOptions).limit(Number(limit));
        res.status(200).json({
            success: true,
            message: "Books retrieved successfully",
            data: books,
        });
    }
    catch (error) {
        console.log(error);
    }
}));
// get request: get book by id
exports.booksRoutes.get("/books/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const book = yield books_model_1.Book.findById(bookId);
        res.status(200).json({
            success: true,
            message: "Book retrieved successfully",
            data: book,
        });
    }
    catch (error) {
        console.log(error);
    }
}));
// put request: update book
exports.booksRoutes.put("/books/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = req.params.bookId;
    const updatedBody = req.body;
    const book = yield books_model_1.Book.findByIdAndUpdate(bookId, updatedBody, { new: true });
    res.status(201).json({
        success: true,
        message: "Book updated successfully",
        data: book,
    });
}));
// delete request: delete a book
exports.booksRoutes.delete("/books/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const book = yield books_model_1.Book.findByIdAndDelete(bookId);
        res.status(200).json({
            success: true,
            message: "Book deleted successfully",
            data: null
        });
    }
    catch (error) {
        console.log(error);
    }
}));
