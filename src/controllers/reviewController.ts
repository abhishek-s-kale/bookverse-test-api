import { NextFunction, Request, Response } from 'express';
import { Review } from '../models/Reviews.js';
import { Book } from '../models/Books.js'
import { ApiErrors } from '../errors/ApiErrors.js';



export const addReview = async (req: Request, res: Response, next: NextFunction) => {
    const { bookId, rating, comment } = req.body;
    const userId = req.user?.id; // Assuming user ID is available in req.user
    if (!bookId || !rating || !comment) {
        return next(ApiErrors.badRequest('bookId, rating, and comment are required'));
    }
    //check if book exists or not
    const book = await Book.findById(bookId);
    if (!book) {
        return next(ApiErrors.notFound('Book not found'));
    }
    //check if review already exists
    const existingReview = await Review.findOne({ bookId, userId });
    if (existingReview) {
        return next(ApiErrors.badRequest('Review already exists for this book by the user'));
    }

    const newReview = await Review.create({ bookId, userId, rating, comment, votes: [] });

    //calculate average rating
    const allReviews = await Review.find({ bookId });
    const averageRating = allReviews.reduce((acc, review) => acc + review.rating, 0) / allReviews.length;
    book.averageRating = averageRating;
    book.reviewCount = allReviews.length;
    await book.save();

    res.status(201).json({
        message:"review added successfully",
        review:newReview
    });

}

export const getReviewsForBook = async (req: Request, res: Response,next:NextFunction) => {
    try {
          const { bookId } = req.params;
    const reviews = await Review.find({ bookId }).populate('userId', 'userName');
    res.status(200).json(reviews);
    } catch (error) {
        next(ApiErrors.internal('Something went wrong'));
    }
  
}
/*
export const voteForReviews = async (req: Request, res: Response,next:NextFunction) => {
    const { reviewId, voteType } = req.body;
    const userId=req.user?.id

    if(!voteType || !['upvote','downvote'].includes(voteType)){
        return next(ApiErrors.badRequest('Invalid vote type'));
    }
    const review =await Review.findById(review


}*/