export interface User {
    userName:string;
    email:string;
    passwordHash:string;
}

export interface Book {
    title:string;
    author:string;
    genre:string;
    publishedDate:Date;
}