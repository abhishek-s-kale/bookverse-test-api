import { Request, Response } from 'express';
import { Book } from '../models/Books.js';
import { ApiErrors } from '../errors/ApiErrors.js';

export const getAllBooks = async (req: Request, res: Response) => {
    // Logic to get all books
    const books = await Book.find();
    res.status(200).json(books);
}

export const createBook = async (req: Request, res: Response) => {
    const { title, author, genre, year, summary } = req.body;
    if (!title || !author || !genre || !year) {
        throw ApiErrors.badRequest('Title, author, genre, and year are required');
    }
    const newBook = await Book.create({ title, author, genre, year, summary });
    res.status(201).json(newBook);
}