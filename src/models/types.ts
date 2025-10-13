import {Document} from 'mongoose';

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
    summary?:string
}

export interface IReview {
    bookId:string;
    userId:string;
    rating:number;
    comment:string;
    votes:IVote[];
}   

export interface IVote {
    userId:string;
    voteType:'upvote' | 'downvote';
}

export enum bookGenre { "Programming", "Fiction", "Science", "History" }