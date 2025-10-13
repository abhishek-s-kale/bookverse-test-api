import { IBook,bookGenre } from "./types.js";
import mongoose, { Document,Schema} from 'mongoose'

const bookSchema = new Schema<IBook>({
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String, required: true },
    year: { type: Number, required: true },
    summary: { type: String }
});

export const Book = mongoose.model<IBook>('Book', bookSchema);
