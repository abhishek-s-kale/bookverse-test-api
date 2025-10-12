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
    year:number;
    summary?:string
}

export interface Review {
    bookId:string;
    userId:string;
    rating:number;
    comment:string;
    votes:Vote[];
}   

export interface Vote {
    voteType:'upvote' | 'downvote';
}