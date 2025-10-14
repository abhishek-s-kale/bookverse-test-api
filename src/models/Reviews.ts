import mongoose, { Document,Schema} from 'mongoose'
import { IReview } from './types.js';

export const reviewSchema = new Schema<IReview>({
    bookId: { type: Schema.Types.ObjectId, ref:"Book", required: true },
    userId: { type: Schema.Types.ObjectId, ref:"User", required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
    votes: [
        { 
            userId:{ type: Schema.Types.ObjectId, ref:"User", required: true },
            voteType: { type: String, enum: ['upvote', 'downvote'], required: true }
        }]
});

export const Review = mongoose.model<IReview>('Review', reviewSchema);
