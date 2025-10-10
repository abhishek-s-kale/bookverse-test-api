export interface User {
    id:string;   
    userName:string;
    email:string;
    passwordHash:string;
}

export interface Book {
    id:string,
    title:string;
    author:string;
    genre:string;
    publishedDate:Date;
}

export interface Review {
    bookId:string;
    userId:string;
    rating:number;
    comment:string;
    votes:Vote[];
}   

export interface Vote {
    reviewId:string;
    userId:string;
    voteType:'upvote' | 'downvote';
}