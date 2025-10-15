import express from "express";
import { z } from "zod";
import { authMiddleware } from "../middleware/auth.ts";
import { randomUUID } from "crypto";
import { validate } from "../middleware/validate.ts";
import { ApiErrors } from "../errors/ApiErrors.ts";
import { books, reviews } from "../data/mockData.ts";
import { addReview, getReviewsForBook,voteForReviews } from '../controllers/reviewController.js'

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

router.patch('/:id',validate(voteSchema), voteForReviews);

export default router;
