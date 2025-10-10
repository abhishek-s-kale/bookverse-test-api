import express from "express";

const router = express.Router();
// Dummy route for books

router.get('/', (req, res) => {
    // Fetch books logic
    res.json({ message: 'List of books', books: [] });
});

//single book route based on id parameter
router.get('/:id', (req, res) => {
    const { id } = req.params;
    // Fetch single book logic
    res.json({ message: `Details of book with id ${id}`, book: { id } });
});

router.post('/', (req, res) => {
    const { title, author, genre, publishedDate } = req.body;
    // Add book logic
    res.status(201).json({ message: 'Book added successfully', book: { title, author, genre, publishedDate } });
});

export default router;
