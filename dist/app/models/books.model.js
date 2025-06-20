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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
const mongoose_1 = require("mongoose");
const borrow_model_1 = require("./borrow.model");
const bookSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: [true, "Title is required"]
    },
    author: {
        type: String,
        required: [true, "Author is required"]
    },
    genre: {
        type: String,
        uppercase: true,
        enum: {
            values: ["FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY"],
            message: "Genre is not Valid! got {VALUE}"
        },
        required: [true, "Genre is required"]
    },
    isbn: {
        type: String,
        required: [true, "ISBN is required"],
        unique: [true, "isbn MUST be unique"]
    },
    description: {
        type: String,
    },
    copies: {
        type: Number,
        required: [true, "Copies is required"],
        min: [1, "Copies must be a positive number"]
    },
    available: {
        type: Boolean,
        default: true
    }
}, {
    versionKey: false,
    timestamps: true
});
// Pre-save middleware
bookSchema.pre('save', function (next) {
    this.title = this.title.trim();
    this.author = this.author.trim();
    next();
});
// Post-delete middleware
bookSchema.post('findOneAndDelete', function (doc, next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (doc) {
            yield borrow_model_1.Borrow.deleteMany({ book: doc._id });
            console.log(`Deleted all borrow records for book: ${doc.title}`);
        }
        next();
    });
});
exports.Book = (0, mongoose_1.model)("Book", bookSchema);
