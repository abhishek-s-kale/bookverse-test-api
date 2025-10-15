import request from 'supertest';
import express from 'express';
import bookRouter from '../routes/books.ts';
import { setupTestDB, teardownTestDB } from './setupTestDB.ts';

const app = express();
app.use(express.json());
app.use('/api/books', bookRouter);

let authToken: string;

describe('Book API', () => {
  jest.setTimeout(30000); // 20 seconds

  beforeAll(async () => {
    await setupTestDB();
    // Register and login to get a token
    const user = {
      userName: 'testuser',
      email: 'testuser@example.com',
      password: 'testpassword'
    };
    await request(app).post('/api/auth/register').send(user);
    const loginRes = await request(app).post('/api/auth/login').send({
      email: user.email,
      password: user.password
    });
    authToken = loginRes.body.token; // Adjust if your login response structure is different
  });

  afterAll(async () => {
    await teardownTestDB();
  });

  it('should create a new book', async () => {
    const newBook = {
      title: 'Test Book',
      author: 'Test Author',
      publishedYear: 2023,
      genre: 'Fiction',
    };
    const response = await request(app)
      .post('/api/books')
      .set('Authorization', `Bearer ${authToken}`)
      .send(newBook)
      .expect(201);
    expect(response.body).toMatchObject(newBook);
  });
});