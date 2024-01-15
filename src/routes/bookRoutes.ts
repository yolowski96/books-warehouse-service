import { Router, Request, Response } from 'express';
import booksService from '../services/books.service';

const router = Router();

/**
 * @swagger
 * /api/books:
 *   get:
 *     summary: Get all books
 *     responses:
 *       200:
 *         description: Successful response
 *       204:
 *         description: Empty database
 *       500:
 *         description: Internal Server Error
 */
router.get('/', async (req: Request, res: Response) => {
  try {
    const books = await booksService.getAllBooks();

    if(books.length === 0){
      res.status(204);
    }

    res.json(books);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

/**
 * @swagger
 * /api/books/{id}:
 *   get:
 *     summary: Get a book by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *       404:
 *         description: Book not found
 *       500:
 *         description: Internal Server Error
 */
router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const book = await booksService.getBookById(id);
    if (book) {
      res.json(book);
    } else {
      res.status(404).json({ error: 'Book not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

/**
 * @swagger
 * /api/books:
 *   post:
 *     summary: Add a new book
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               quantity:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Book created successfully
 *       500:
 *         description: Internal Server Error
 */
router.post('/', async (req: Request, res: Response) => {
  const { title, author, quantity } = req.body;
  try {
    const newBook = await booksService.addBook({ title, author, quantity });
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

/**
 * @swagger
 * /api/books/{id}:
 *   put:
 *     summary: Update a existing book
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               quantity:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Book updated successfully
 *       404:
 *         description: Book not found
 *       500:
 *         description: Internal Server Error
 * 
 */
router.put('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, author, quantity } = req.body;
  try {
    const updatedBook = await booksService.updateBook(id, { title, author, quantity });
    if (updatedBook) {
      res.json(updatedBook);
    } else {
      res.status(404).json({ error: 'Book not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

/**
 * @swagger
 * /api/books/{id}:
 *   delete:
 *     summary: Delete a book by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Book deleted successfully
 *       404:
 *         description: Book not found
 *       500:
 *         description: Internal Server Error
 */
router.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deleted = await booksService.deleteBook(id);
    if (deleted) {
      res.json({ message: 'Book deleted successfully' });
    } else {
      res.status(404).json({ error: 'Book not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/:id/low-stock', async (req: Request, res: Response) => {
  const { id } = req.params;
  const threshold = 10; // You can adjust the threshold as needed
  try {
    const isLowStock = await booksService.isLowStock(id, threshold);
    res.json({ isLowStock });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
