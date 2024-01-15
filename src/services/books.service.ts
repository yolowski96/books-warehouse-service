import { Book, BookInput } from "../models/books.model";
import { initializeDatabase } from "../db";

class BooksService {
  private dbPromise = process.env.NODE_ENV === 'test' ? initializeDatabase('test') : initializeDatabase('production');

  async getAllBooks(): Promise<Book[]> {
    const db = await this.dbPromise;
    return db.all("SELECT * FROM books");
  }

  async getBookById(id: string): Promise<Book | undefined> {
    const db = await this.dbPromise;
    return db.get("SELECT * FROM books WHERE id = ?", id);
  }

  async addBook(bookInput: BookInput): Promise<Book> {
    const db = await this.dbPromise;
    const newBook: Book = {
      id: String(new Date().getTime()),
      ...bookInput,
    };
    await db.run(
      "INSERT INTO books (id, title, author, quantity) VALUES (?, ?, ?, ?)",
      [newBook.id, newBook.title, newBook.author, newBook.quantity]
    );
    return newBook;
  }

  async updateBook(
    id: string,
    bookInput: BookInput
  ): Promise<Book | undefined> {
    const db = await this.dbPromise;
    const existingBook = await this.getBookById(id);

    if (existingBook) {
      const updatedBook: Book = {
        id,
        ...bookInput,
      };

      await db.run(
        "UPDATE books SET title = ?, author = ?, quantity = ? WHERE id = ?",
        [
          updatedBook.title,
          updatedBook.author,
          updatedBook.quantity,
          updatedBook.id,
        ]
      );

      return updatedBook;
    }

    return undefined;
  }

  async deleteBook(id: string): Promise<boolean> {
    const db = await this.dbPromise;

    const result = await db.run("DELETE FROM books WHERE id = ?", id);
    
    return (result?.changes as number) > 0;
  }

  async isLowStock(id: string, threshold: number): Promise<boolean> {
    const book = await this.getBookById(id);
    return book ? book.quantity <= threshold : false;
  }
}

export default new BooksService();
