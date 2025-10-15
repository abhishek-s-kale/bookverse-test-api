import request from 'supertest';
import express from 'express';
import bookRouter from '../routes/books.js';
import  {setupTestDB,teardownTestDB}  from './setupTestDB.js';


const app = express();
app.use(express.json());
app.use('/api/books', bookRouter);

describe('Book API', () => {
  beforeAll(async () => {
    await setupTestDB();
  });

  afterAll(async () => {
    await teardownTestDB();
  });

  // Add your tests here
    it('should create a new book', async () => {
        const newBook = {
            title: 'Test Book',
            author: 'Test Author',
            publishedYear: 2023,
            genre: 'Fiction',
        };
        const response = await request(app)
            .post('/api/books')
            .send(newBook)
            .expect(201);
        expect(response.body).toMatchObject(newBook);
    });
});

