import express from "express";
import dotenv from 'dotenv';
import cors from 'cors';

import authRouter from './routes/auth';
import bookRouter from './routes/books';
import reviewRouter from './routes/reviews';
import { errorHandler } from './middleware/ErrorHandler';    

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/books', bookRouter);
app.use('/api/reviews', reviewRouter);  


const PORT = process.env.PORT || 3000;

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});