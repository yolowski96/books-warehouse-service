// test/routes/booksRoutes.test.ts
import request from 'supertest';
import express from 'express';
import booksRoutes from '../../src/routes/bookRoutes';

const app = express();
app.use(express.json());
app.use('/api/books', booksRoutes);

describe('GET /api/books', () => {
  it('should get all books', async () => {
    const response = await request(app).get('/api/books');
    expect(response.status).toBe(200);
  });
});

describe('POST /api/books', () => {
  it('should add a new book', async () => {
    const newBook = {
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      quantity: 5,
    };

    const response = await request(app)
      .post('/api/books')
      .send(newBook);

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject(newBook);
  });
});