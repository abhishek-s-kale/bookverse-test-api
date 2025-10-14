import express from "express";
import { z } from "zod";
import { authMiddleware } from "../middleware/auth.js";
import {getAllBooks,createBook,getBookById} from '../controllers/booksController.js';
import { validate } from "../middleware/validate.js";

const router = express.Router();
router.use(authMiddleware);
router.get("/", getAllBooks);

const createBookSchema = z.object({
    title:z.string().min(1),
    author:z.string().min(1),
    genre:z.enum([ "Programming", "Fiction", "Science", "History"]),
    year:z.number().int().positive(),
    summary:z.string().optional()
})


router.get('/:id', getBookById);
router.post('/', validate(createBookSchema), createBook);

export default router;
