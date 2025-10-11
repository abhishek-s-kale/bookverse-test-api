import express from "express";
import { z } from "zod";
import { authMiddleware } from "../middleware/auth";
import { randomUUID } from "crypto";
import { generateToken } from '../utils/jwt';
import { validate } from "../middleware/validate";
import { ApiErrors } from "../errors/ApiErrors";
import { books } from "../data/mockData";


const router = express.Router();
// Dummy route for books

router.use(authMiddleware);

const createBookSchema = z.object({
    title:z.string().min(1),
    author:z.string().min(1),
    genre:z.string().min(1),
    year:z.number().int().positive(),
    summary:z.string().optional()
})

router.get('/', (req, res) => {
    // Fetch books logic
    res.json({ message: 'List of books', books: books });
});

//single book route based on id parameter
router.get('/:id', (req, res) => {
    const { id } = req.params;
    // Fetch single book logic
    res.json({ message: `Details of book with id ${id}`, book: { id } });
});

router.post('/', validate(createBookSchema), (req, res,next) => {
    const body = req.body as z.infer<typeof createBookSchema>;
    const user = (req as any).user;
    if(!user || !user.id){
        return next(ApiErrors.unAuthorized());
    }
    const newBook= {
        id:randomUUID(),
        ...body,
    }
    books.unshift(newBook)
    // Add book logic
    res.status(201).json({ message: 'Book added successfully', book: newBook });
});

export default router;
