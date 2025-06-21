import { model, Schema } from "mongoose";
import { IBook } from "../interfaces/books.interface";
import { Borrow } from "./borrow.model";

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
        min: [0, "Copies must be a positive number"]
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
bookSchema.post('findOneAndDelete', async function (doc, next) {
  if (doc) {
    await Borrow.deleteMany({ book: doc._id });
    console.log(`Deleted all borrow records for book: ${doc.title}`);
  }
  next();
});

export const Book = model<IBook>("Book", bookSchema);
