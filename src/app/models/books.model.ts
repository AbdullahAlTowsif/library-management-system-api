import { model, Schema } from "mongoose";
import { IBook } from "../interfaces/books.interface";

const bookSchema = new Schema<IBook>({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        uppercase: true,
        enum: {
            values: ["FICTION" , "NON_FICTION" , "SCIENCE" , "HISTORY" , "BIOGRAPHY" , "FANTASY"],
            message: "Genre is not Valid! got {VALUE}"
        },
        required: true
    },
    isbn: {
        type: String,
        required: true,
        unique: [true, "isbn MUST be unique"]
    },
    description: {
        type: String,
    },
    copies: {
        type: Number,
        required: true
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
