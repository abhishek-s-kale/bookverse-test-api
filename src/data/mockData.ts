import { User, Book, Review, Vote } from "../models/types.ts";
import bcrypt from 'bcryptjs';
import { randomUUID } from "crypto";

const user1: User = {
    id: "user_1",
    userName: "john_doe",
    email: "john@example.com",
    passwordHash: bcrypt.hashSync("password123", 8)
}
const user2: User = {
    id: "user_2",
    userName: "bob",
    email: "bob@example.com",
    passwordHash: bcrypt.hashSync("password123", 8)
}

const user3: User = {
    id: "user_3",
    userName: "carl",
    email: "carl@example.com",
    passwordHash: bcrypt.hashSync("password123", 8)
}

export const users: User[] = [user1, user2, user3]

export const books: Book[] = [
    {
        id: "book_1",
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        genre: "Fiction",
        year: 1994
    },
    {
        id: "book_2",
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        genre: "Fiction",
        year: 2004
    },
    {
        id: "book_3",
        title: "1984",
        author: "George Orwell",
        genre: "Dystopian",
        year: 1980,
        summary: "a good books random summary"
    }
]
export const reviews: Review[] = [
    {
        bookId: books[0].id,
        userId: user1.id,
        rating: 5,
        comment: "A masterpiece of 20th-century literature.",
        votes: [
            {
                userId: user1.id,
                voteType: 'upvote'
            },
            {
                userId: user2.id,
                voteType: 'downvote'
            }
        ]
    },
    {
        bookId: books[1].id,
        userId: user2.id,
        rating: 4,
        comment: "A gripping tale of moral growth.",
        votes: [
            {
                userId: user1.id,
                voteType: 'upvote'
            },
            {
                userId: user2.id,
                voteType: 'downvote'
            }
        ]
    },
    {
        bookId: books[2].id,
        userId: user3.id,
        rating: 5,
        comment: "A chilling depiction of a totalitarian regime.",
        votes: [
            {
                userId: user1.id,
                voteType: 'upvote'
            },
            {
                userId: user2.id,
                voteType: 'downvote'
            }
        ]
    }
]