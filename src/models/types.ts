import mongoose,{Document} from 'mongoose';

export interface IUser extends Document {
    userName:string;
    email:string;
    passwordHash:string;
}

export interface IBook extends Document {
    title:string;
    author:string;
    genre:"Programming" | "Fiction" | "Science" | "History";
    year:number;
    summary?:string,
    averageRating?:number;
    reviewCount?:number;
}

export interface IReview extends Document {
    bookId:mongoose.Types.ObjectId;
    userId:mongoose.Types.ObjectId;
    rating:number;
    comment:string;
    votes:IVote[];
}   

export interface IVote {
    userId:mongoose.Types.ObjectId;
    voteType:'upvote' | 'downvote';
}

export enum bookGenre { "Programming", "Fiction", "Science", "History" }