import { Model, Types } from "mongoose";

export interface IBorrowBook {
  book: Types.ObjectId,
  quantity: number,
  dueDate: Date
}


export interface BorrowStaticMethods extends Model<IBorrowBook> {
    borrowAndUpdate(bookId: string, quantity: number) : Promise<IBorrowBook>
}