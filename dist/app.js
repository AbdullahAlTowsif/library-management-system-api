"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const books_controller_1 = require("./app/controllers/books.controller");
const errorHandler_1 = __importDefault(require("./app/middlewares/errorHandler"));
const borrow_controller_1 = require("./app/controllers/borrow.controller");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api', books_controller_1.booksRoutes);
app.use('/api/borrow', borrow_controller_1.borrowRoutes);
app.use(errorHandler_1.default);
app.get('/', (req, res) => {
    res.send("Welcome to Library Management System");
});
exports.default = app;
