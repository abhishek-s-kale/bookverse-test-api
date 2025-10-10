import { User, Book, Review, Vote } from "../models/types";
import bcrypt from 'bcryptjs';
import { randomUUID } from "crypto";

const user1 : User={
    id:randomUUID(),
    userName:"john_doe",
    email:"john@example.com",
    passwordHash:bcrypt.hashSync("password123", 8)
}
const user2 : User={
    id:randomUUID(),
    userName:"bob",
    email:"bob@example.com",
    passwordHash:bcrypt.hashSync("password123", 8)
}

const user3 : User={
    id:randomUUID(),
    userName:"carl",
    email:"carl@example.com",
    passwordHash:bcrypt.hashSync("password123", 8)
}

export const users:User[]=[user1,user2,user3]

export const books:Book[]=[
    {
        id:randomUUID(),
        title:"The Great Gatsby",
        author:"F. Scott Fitzgerald",
        genre:"Fiction",
        publishedDate:new Date("1925-04-10")
    },
    {
        id:randomUUID(),
        title:"To Kill a Mockingbird",
        author:"Harper Lee",
        genre:"Fiction",
        publishedDate:new Date("1960-07-11")
    },
    {
        id:randomUUID(),
        title:"1984",
        author:"George Orwell",
        genre:"Dystopian",
        publishedDate:new Date("1949-06-08")
    }
]
export const reviews:Review[]=[
    {
        bookId:books[0].id,
        userId:user1.id,
        rating:5,
        comment:"A masterpiece of 20th-century literature.",
         votes:[
            {
                reviewId:books[1].id,
                userId:user1.id,
                voteType:'upvote'
            },
            {
                reviewId:books[1].id,
                userId:user2.id,
                voteType:'downvote'
            }
        ]
    },
    {
        bookId:books[1].id,
        userId:user2.id,
        rating:4,
        comment:"A gripping tale of moral growth.",
        votes:[
            {
                reviewId:books[1].id,
                userId:user1.id,
                voteType:'upvote'
            },
            {
                reviewId:books[1].id,
                userId:user2.id,
                voteType:'downvote'
            }
        ]
    },
    {
        bookId:books[2].id,
        userId:user3.id,
        rating:5,
        comment:"A chilling depiction of a totalitarian regime.",
        votes:[
            {
                reviewId:books[2].id,
                userId:user1.id,
                voteType:'upvote'
            },
            {
                reviewId:books[2].id,
                userId:user2.id,
                voteType:'downvote'
            }
        ]
    }
]