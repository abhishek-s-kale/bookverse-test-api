import { NextFunction, Request, Response } from "express";
import { Review } from "../models/Reviews.js";
import { Book } from "../models/Books.js";
import { ApiErrors } from "../errors/ApiErrors.js";
import { updateBookStats } from "../utils/updateBookStats.js";

export const addReview = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { bookId, rating, comment } = req.body;
  const userId = req.user?.id; // Assuming user ID is available in req.user
  if (!bookId || !rating || !comment) {
    return next(
      ApiErrors.badRequest("bookId, rating, and comment are required")
    );
  }
  //check if book exists or not
  const book = await Book.findById(bookId);
  if (!book) {
    return next(ApiErrors.notFound("Book not found"));
  }
  //check if review already exists
  const existingReview = await Review.findOne({ bookId, userId });
  if (existingReview) {
    return next(
      ApiErrors.badRequest("Review already exists for this book by the user")
    );
  }

  const newReview = await Review.create({
    bookId,
    userId,
    rating,
    comment,
    votes: [],
  });
  await updateBookStats(bookId);

  res.status(201).json({
    message: "review added successfully",
    review: newReview,
  });
};

export const getReviewsForBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { bookId } = req.params;
    const reviews = await Review.find({ bookId }).populate(
      "userId",
      "userName"
    );
    res.status(200).json(reviews);
  } catch (error) {
    next(ApiErrors.internal("Something went wrong"));
  }
};

export const voteForReviews = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId, voteType } = req.body;
  const reviewId = req.params.id;
  if (!voteType || !["upvote", "downvote"].includes(voteType)) {
    return next(ApiErrors.badRequest("Invalid vote type"));
  }
  const review = await Review.findById(reviewId);
  if (!review) {
    return next(ApiErrors.notFound("Review not found"));
  }
  const existingVote = review.votes.find((v) => v.userId.toString() === userId);
  console.log("existingVote", existingVote);
  if (existingVote) {
    existingVote.voteType = voteType;
  } else {
    console.log("in else");
    review.votes.push({ userId, voteType });
  }
  await review.save();
  res.status(200).json({
    votes: review.votes,
  });
};
