import { model, Schema } from "mongoose";
import { IBook } from "../interfaces/books.interface";

const bookSchema = new Schema<IBook>({
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
            values: ["FICTION" , "NON_FICTION" , "SCIENCE" , "HISTORY" , "BIOGRAPHY" , "FANTASY"],
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

export const Book = model<IBook>("Book", bookSchema);
