import express from "express";
import { z } from "zod";
import { authMiddleware } from "../middleware/auth";
import { randomUUID } from "crypto";
import { validate } from "../middleware/validate";
import { ApiErrors } from "../errors/ApiErrors";
import { books, reviews } from "../data/mockData";

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
    voteType: z.enum(['upvote', 'downvote'])
})

router.get('/', (req, res) => {
    // Fetch reviews logic
    res.json({ message: 'List of reviews', reviews: [] });
});
router.post('/', validate(createreviewSchema), (req, res, next) => {
    const body = req.body as z.infer<typeof createreviewSchema>;
    const user = (req as any).user;
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
    }
    reviews.unshift(newReview)
    res.status(201).json({ message: 'Review added successfully', review: newReview });
});

router.patch('/:id',authMiddleware, validate(voteSchema), (req, res, next) => {
    const {id}= req.params
   const body = req.body as z.infer<typeof voteSchema>;
    const user = (req as any).user;
    if (!user || !user.id) {
        return next(ApiErrors.unAuthorized());
    }
    //ensure book exists
    const review = reviews.find((r) => `${r.bookId}_${r.userId}` === id);
    if (!review) {
        return next(ApiErrors.badRequest("Review not found"));
    }
    const existingVote = review.votes[user.id]
    if(existingVote === body){
        delete review.votes[user.id];
    }
    else {
        review.votes[user.id] = body;
    }
     res.status(200).json({
        id: review.bookId+'_'+review.userId,
        votes: review.votes
    });
});

export default router;
