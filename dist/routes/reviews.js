import express from "express";
import { z } from "zod";
import { authMiddleware } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import { ApiErrors } from "../errors/ApiErrors.js";
import { books, reviews } from "../data/mockData.js";
const router = express.Router();
// Dummy route for reviews
router.use(authMiddleware);
const createreviewSchema = z.object({
    bookId: z.string().min(1),
    userId: z.string().min(1),
    rating: z.number().int().min(1).max(5),
    comment: z.string().min(1)
});
const voteSchema = z.object({
    userId: z.string().min(1),
    voteType: z.enum(['upvote', 'downvote'])
});
router.get('/', (req, res) => {
    // Fetch reviews logic
    res.json({ message: 'List of reviews', reviews: [] });
});
router.post('/', validate(createreviewSchema), (req, res, next) => {
    const body = req.body;
    const user = req.user;
    if (!user || !user.id) {
        return next(ApiErrors.unAuthorized());
    }
    //ensure book exists
    const book = books.find((b) => b.id === body.bookId);
    if (!book) {
        return next(ApiErrors.badRequest("Book not found"));
    }
    const newReview = {
        ...body,
        votes: []
    };
    reviews.unshift(newReview);
    res.status(201).json({ message: 'Review added successfully', review: newReview });
});
router.get('/getAllReviews', (req, res, next) => {
    //if user  is valid then only return reviews
    const user = req.user;
    if (!user || !user.id) {
        return next(ApiErrors.unAuthorized());
    }
    res.json({ message: 'List of all reviews', reviews });
});
router.patch('/:id', authMiddleware, validate(voteSchema), (req, res, next) => {
    const { id } = req.params;
    const body = req.body;
    const user = req.user;
    if (!user || !user.id) {
        return next(ApiErrors.unAuthorized());
    }
    //ensure book exists
    const review = reviews.find((r) => r.bookId === id);
    if (!review) {
        return next(ApiErrors.badRequest("Review not found"));
    }
    //make sure for each review for a user there is only one vote
    const existingVote = review.votes.find((v) => v.userId === user.id);
    if (existingVote?.voteType === body.voteType) {
        review.votes = review.votes.filter((v) => v.userId !== user.id);
    }
    else {
        review.votes.push(body);
    }
    res.status(200).json({
        id: review.bookId + '_' + review.userId,
        votes: review.votes
    });
});
export default router;
