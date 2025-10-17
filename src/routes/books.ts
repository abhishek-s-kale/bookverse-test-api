import express from "express";
import { z } from "zod";
import { authMiddleware } from "../middleware/auth.ts";
import {getAllBooks,createBook,getBookById,deleteBook} from '../controllers/booksController.ts';
import { validate } from "../middleware/validate.ts";

const router = express.Router();
router.use(authMiddleware);
router.get("/", getAllBooks);

const createBookSchema = z.object({
    title:z.string().min(1),
    author:z.string().min(1),
    genre:z.enum([ "Programming", "Fiction", "Science", "History"]),
    year:z.number().int().min(1800).max(new Date().getFullYear()),
    summary: z.string().max(500).optional()
})


router.get('/:id', getBookById);
router.post('/', validate(createBookSchema), createBook);
router.delete('/:id', deleteBook);

export default router;
