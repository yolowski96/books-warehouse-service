import booksService from '../../src/services/books.service';

describe('BooksService', () => {

  it('should add a book to the database', async () => {
    const newBook = { title: 'Test Book', author: 'Test Author', quantity: 5 };

    const result = await booksService.addBook(newBook);

    expect(result).toBeTruthy();
  });

  it('should get all books from the database', async () => {
    const allBooks = await booksService.getAllBooks();

    expect(allBooks).toBeDefined();
  });

  it('should get a book by ID from the database', async () => {
    const newBook = { title: 'Test Book', author: 'Test Author', quantity: 5 };

    const result = await booksService.addBook(newBook);

    const book = await booksService.getBookById(result.id);

    expect(book).toBeDefined();
  });

  it('should delete a book by ID from the database', async () => {
    const newBook = { title: 'Test Book', author: 'Test Author', quantity: 5 };
    const result = await booksService.addBook(newBook);
    
    const deletedBook = await booksService.deleteBook(result.id);

    expect(deletedBook).toBeTruthy();
  });
});
