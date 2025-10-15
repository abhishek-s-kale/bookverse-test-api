import { Review } from "../models/Reviews.ts";
import { Book } from "../models/Books.ts";

export const updateBookStats = async (bookId: string) => {
  const reviews = await Review.find({ bookId });
  const reviewCount = reviews.length;
  const averageRating =
    reviewCount > 0
      ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviewCount
      : 0;

  // Update book stats in the database
  await Book.findByIdAndUpdate(bookId, { averageRating, reviewCount });
};
