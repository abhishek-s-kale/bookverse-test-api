import { NextFunction, Request, Response } from 'express';
import {Review} from '../models/Reviews.js'
import { Book } from '../models/Books.js';
import { ApiErrors } from '../errors/ApiErrors.js';

export const getAllBooks = async (req: Request, res: Response,next:NextFunction) => {
    try{
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const genre = req.query.genre as string | undefined;
    const filter: Record <string, any> = {};
    if (genre) {
        filter.genre = genre;
    }
    const totalCount = await Book.countDocuments(filter);
    const books = await Book.find(filter).skip((page-1)*limit).limit(limit).select("title author genre averageRating reviewCount");
    const totalPages = Math.ceil(totalCount/limit);

    res.status(200).json({
        page,
        limit,
        totalCount,
        totalPages,
        hasNextPage:page < totalPages,
        hasPrevPage:page > 1,
        books
    });
    }
    catch(error){
        console.log(error);
        next(ApiErrors.internal("Failed to fetch books"))
    }
}

export const getBookById = async (req: Request, res: Response, next: any) => {
    try {
    const { id } = req.params;
    const book = await Book.findById(id);
    if (!book) {
        return next(ApiErrors.notFound('Book not found'));
    }
    const reviews = await Review.find({bookId: id}).populate('userId', 'userName');
    res.status(200).json({book,reviews});
    }
    catch(error){
         console.log(error);
        next(ApiErrors.internal("Failed to fetch this book"))
    }
    
}

export const createBook = async (req: Request, res: Response) => {
    try {
            const { title, author, genre, year, summary } = req.body;
    if (!title || !author || !genre || !year) {
        throw ApiErrors.badRequest('Title, author, genre, and year are required');
    }
    const newBook = await Book.create({ title, author, genre, year, summary });
    res.status(201).json(newBook);
        }
     catch(error){
         console.log(error);
        next(ApiErrors.internal("Failed to fetch this book"))
    }
}