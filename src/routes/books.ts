import express from "express";
import { z } from "zod";
import { authMiddleware } from "../middleware/auth.js";
import {getAllBooks,createBook} from '../controllers/booksController.js';
import { randomUUID } from "crypto";
import { validate } from "../middleware/validate.js";
import { ApiErrors } from "../errors/ApiErrors.js";
import { books } from "../data/mockData.js";


const router = express.Router();
// Dummy route for books

router.use(authMiddleware);

router.get('/', getAllBooks);

const createBookSchema = z.object({
    title:z.string().min(1),
    author:z.string().min(1),
    genre:z.string().min(1),
    year:z.number().int().positive(),
    summary:z.string().optional()
})

// router.get('/', (req, res) => {
//     // Fetch books logic
//     res.json({ message: 'List of books', books: books });
// });

//single book route based on id parameter
router.get('/:id', (req, res) => {
    const { id } = req.params;
    // Fetch single book logic
    res.json({ message: `Details of book with id ${id}`, book: { id } });
});

router.post('/', validate(createBookSchema), createBook);

export default router;
