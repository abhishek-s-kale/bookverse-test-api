import express from "express";
import { z } from "zod";
import { authMiddleware } from "../middleware/auth.js";
import {getAllBooks,createBook,getBookById} from '../controllers/booksController.js';
import { randomUUID } from "crypto";
import { validate } from "../middleware/validate.js";
//import { ApiErrors } from "../errors/ApiErrors.js";
//import { books } from "../data/mockData.js";


const router = express.Router();
// Dummy route for books

router.use(authMiddleware);

router.get('/', getAllBooks);

const createBookSchema = z.object({
    title:z.string().min(1),
    author:z.string().min(1),
    genre:z.enum([ "Programming", "Fiction", "Science", "History"]),
    year:z.number().int().positive(),
    summary:z.string().optional()
})

//single book route based on id parameter
router.get('/:id', getBookById);

router.post('/', validate(createBookSchema), createBook);

export default router;
