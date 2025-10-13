import express from "express";
import { z } from "zod";
import { authMiddleware } from "../middleware/auth.js";
import { randomUUID } from "crypto";
import { validate } from "../middleware/validate.js";
import { ApiErrors } from "../errors/ApiErrors.js";
import { books, reviews } from "../data/mockData.js";
import { addReview, getReviewsForBook } from '../controllers/reviewController.js'

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
})

router.get('/', (req, res) => {
    res.json({ message: 'List of reviews', reviews: [] });
});

router.post('/', validate(createreviewSchema), addReview);
router.get('/:bookId', getReviewsForBook);

router.get('/getAllReviews', (req, res, next) => {

    const user = (req as any).user;
    if (!user || !user.id) {
        return next(ApiErrors.unAuthorized());
    }
    res.json({ message: 'List of all reviews', reviews });
});

router.patch('/:id', authMiddleware, validate(voteSchema), (req, res, next) => {
    const { id } = req.params
    const body = req.body as z.infer<typeof voteSchema>;
    const user = (req as any).user;
    if (!user || !user.id) {
        return next(ApiErrors.unAuthorized());
    }

    const review = reviews.find((r) => r.bookId === id);
    if (!review) {
        return next(ApiErrors.badRequest("Review not found"));
    }
   
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
