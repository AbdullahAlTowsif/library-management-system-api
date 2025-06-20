import { Schema, model, Types } from 'mongoose';
import { Book } from './books.model';
import { BorrowStaticMethods, IBorrowBook } from '../interfaces/borrow.interface';

const borrowSchema = new Schema<IBorrowBook>(
  {
    book: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
    quantity: { type: Number, required: true, min: [1, 'Quantity must be at least 1'] },
    dueDate: { type: Date, required: true },
  },
  {
    versionKey: false,
    timestamps: true
  }
);

// ✅ Static method to borrow and update book
borrowSchema.statics.borrowAndUpdate = async function (
  bookId: string,
  quantity: number
): Promise<IBorrowBook> {
  const book = await Book.findById(bookId);

  if (!book) {
    throw new Error('Book not found');
  }

  if (book.copies < quantity) {
    throw new Error('Not enough copies available');
  }

  // Update book copies and availability
  book.copies -= quantity;
  if (book.copies === 0) {
    book.available = false;
  }

  await book.save();

  // Create Borrow record (without dueDate yet)
  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + 7); // Default: 7-day borrow

  const borrow = await this.create({
    book: book._id,
    quantity,
    dueDate,
  });

  return borrow;
};

export const Borrow = model<IBorrowBook, BorrowStaticMethods>('Borrow', borrowSchema);
